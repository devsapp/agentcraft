import { InstructionChatBuilder } from "features/instructionChat/builder";


export function getServerSideProps(context: any) {
  const { params } = context;
  const workspaceId= params.id;
  const instructionChatId = params.instructionChatId;
  return {
    props: {
      workspaceId,
      instructionChatId
    },
  }
}

export default function IndexPage({ workspaceId }: any) {

  return (
    <InstructionChatBuilder workspaceId={workspaceId} />
  );
}
