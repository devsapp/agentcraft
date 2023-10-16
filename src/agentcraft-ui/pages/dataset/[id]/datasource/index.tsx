
import { Datasource } from "@/feature/datasource";



export function getServerSideProps(context: any) {
  const { params } = context;
  const datasetId = params.id;
  return {
    props: {
      datasetId,
    },
  }
}

export default function IndexPage() {

  return (
    <Datasource  />
  );
}
