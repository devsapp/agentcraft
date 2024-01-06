
import { ChatListPage } from "features/assistant/chatlist";


export function getServerSideProps(context: any) {
    const { params } = context;
    const appId = params.id;
    const assistantId = params.assistantId;
    return {
        props: {
            appId,
            assistantId
        },
    }
}

export default function IndexPage({ appId, assistantId }: any) {

    return <ChatListPage appId={appId} assistantId={assistantId} />

}
