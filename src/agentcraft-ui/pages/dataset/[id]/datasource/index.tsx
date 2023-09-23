
import { Datasource } from "@/components/datasource";



export function getServerSideProps(context: any) {
  const { params } = context;
  const datasetId = params.id;
  return {
    props: {
      datasetId,
    },
  }
}

export default function IndexPage({ datasetId }:any) {

  return (
    <Datasource datasetId={datasetId} />
  );
}
