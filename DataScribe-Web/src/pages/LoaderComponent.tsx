import { Spinner } from "reactstrap";

const LoaderComponent = () => {
  return (
    <div className="loader-wrapper">
      <Spinner type="grow" color="light" />
    </div>
  );
};

export default LoaderComponent;
