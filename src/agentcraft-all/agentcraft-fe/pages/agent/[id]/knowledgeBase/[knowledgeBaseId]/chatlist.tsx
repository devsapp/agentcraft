
import { ChatListPage } from "features/knowledgeBase/chatlist";


export function getServerSideProps(context: any) {
    const { params } = context;
    const appId = params.id;
    const knowledgeBaseId = params.knowledgeBaseId;
    return {
        props: {
            appId,
            knowledgeBaseId
        },
    }
}

export default function IndexPage({ appId, knowledgeBaseId }: any) {

    return <ChatListPage appId={appId} knowledgeBaseId={knowledgeBaseId} />

}
