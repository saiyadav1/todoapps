import { Box, Button, Card, Grid, Paper, Typography } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { SnackbarContext } from "../Context/SnackbarContext";
import { db, storage } from "../firebase/Firebase";
import LoadingScreen from "../common/LoadingScreen";

function UploadLegalDocuments() {
  const { callSnackbar } = useContext(SnackbarContext);
  const [loading, setLoading] = useState(false);
  const [nda, setNda] = useState("");
  const [agreement, setAgreement] = useState("");
  const ndaUploadFunc = (e) => {
    setNda(e.target.files[0]);
  };

  const agreementFunc = (e) => {
    setAgreement(e.target.files[0]);
  };

  const submitDocsFunc = async () => {
    if (nda.length === 0 || agreement.length === 0) {
      callSnackbar(true, "Upload all documents", "error");
    } else {
      setLoading(true);
      try {
        const latestDocRef = db
          .collection("Latests")
          .doc("latestDocumentVersion");
        const latestDocData = await latestDocRef.get();
        const latestVersion = latestDocData.data().version + 1;
        const data = {
          dateOfCreation: new Date(),
          documentUrls: {
            NDA: nda.name,
            agreement: agreement.name,
          },
          version: latestVersion,
        };
        const res = await db.collection("LegalDocuments").add(data);
        await storage
          .child(`LegalDocuments/${res.id}/${nda.name}`)
          .put(nda);
        await storage
          .child(`LegalDocuments/${res.id}/${agreement.name}`)
          .put(agreement);

        const ndaUrl = await storage
          .child(`LegalDocuments/${res.id}/${nda.name}`)
          .getDownloadURL();
        const agreementUrl = await storage
          .child(`LegalDocuments/${res.id}/${agreement.name}`)
          .getDownloadURL();

        await db
          .collection("LegalDocuments")
          .doc(res.id)
          .update({
            ...data,
            documentUrls: {
              NDA: ndaUrl,
              agreement: agreementUrl,
            },
          });
        await latestDocRef.update({
          docId: res.id,
          version: latestVersion,
        });
        setLoading(false);
        callSnackbar(true, "Documents uploaded succesfully", "success");
        console.log("success");
      } catch (err) {
        console.log(err);
      }
    }
  };

  if (loading) return <LoadingScreen />;
  return (
    <div>
      <Paper style={{ padding: "20px" }}>
        <Typography variant="h1" style={{ marginBottom: "20px" }}>
          Upload Legal Documents
        </Typography>
        <Grid container spacing={3}>
          <Grid item lg={6} md={6} sm={12}>
            <Box>
              <Button variant="contained" color="primary" component="label">
                Upload NDA
                <input type="file" hidden onChange={ndaUploadFunc} />
              </Button>
              <Typography>{nda.name}</Typography>
            </Box>
          </Grid>
          <Grid item lg={6} md={6} sm={12}>
            <Box>
              <Button variant="contained" color="primary" component="label">
                Upload Agreement
                <input type="file" hidden onChange={agreementFunc} />
              </Button>
              <Typography>{agreement.name}</Typography>
            </Box>
          </Grid>
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={submitDocsFunc}
            >
              {" "}
              Submit All Documents
            </Button>
          </Box>
        </Grid>
      </Paper>
    </div>
  );
}

export default UploadLegalDocuments;
