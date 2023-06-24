import { useState } from "react";
import { Button, Input, Label, Modal } from "reactstrap";
import "../../styles/workspace.scss";

const WorkSpace = () => {
  const [modal, setModal] = useState(false);
  const [type, setType] = useState(true);
  const [data, seData] = useState<any[]>([]);
  return (
    <div className="work-space-main">
      {data?.length === 0 ? (
        <div className="h-100 w-100 d-flex justify-content-center align-items-center">
          <Button className="btn-primary" onClick={() => setModal(true)}>
            Create Workspace
          </Button>
        </div>
      ) : (
        <div>
          <h1>list</h1>
          <Button className="btn-primary" onClick={() => setModal(true)}>
            Build
          </Button>
        </div>
      )}
      <Modal toggle={() => setModal(false)} isOpen={modal} centered>
        <div className="p-30">
          <h4 className="text-center">Data Sources</h4>
          <div className="d-flex">
            <p className={`w-100 p-20 text-center ${type ? "active-modal" : ""} mb-0 cursor-pointer`} onClick={() => setType(true)}>
              Files
            </p>
            <p className={`w-100 p-20 text-center ${!type ? "active-modal" : ""} mb-0 cursor-pointer`} onClick={() => setType(false)}>
              Website
            </p>
          </div>
          {type ? (
            <div className="mt-20">
              <Label>Upload Files</Label>
              <Input type="file" accept="application/pdf" className="p-10" />
            </div>
          ) : (
            <div className="mt-20">
              <Label>Website</Label>
              <Input className="p-10" placeholder="https:www.example.com" />
            </div>
          )}
          <Button className="btn-primary mt-20 w-100">Next</Button>
        </div>
      </Modal>
    </div>
  );
};

export default WorkSpace;
