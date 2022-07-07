import { Switch, Route } from "react-router-dom";
import UploadAndConvert from "./pages/Upload&Convert";
import Document from "./pages/Document";
import PdfData from "./pages/PdfData";

export default function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <UploadAndConvert />
      </Route>
      <Route path="/document" exact>
        <PdfData />
      </Route>
    </Switch>
  )  
}
