import Button from "../../ui/Button.jsx";
import { Form, useFetcher } from "react-router";

function UpdateOrder({order}) {
  const fetcher = useFetcher()
  return (
    <fetcher.Form method="patch" className="text-right">
      <Button type="primary">Make priority</Button>
    </fetcher.Form>

  );
}

export default UpdateOrder;