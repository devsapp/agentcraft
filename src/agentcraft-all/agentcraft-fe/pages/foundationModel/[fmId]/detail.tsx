
import { FoundationModelDetail } from "features/foundationModel/detail";

export function getServerSideProps(context: any) {
  const { params } = context;
  const fmId = params.fmId;
  return {
    props: {
      fmId,
    },
  }
}

export default function IndexPage() {

  return (
    <FoundationModelDetail />
  );
}
