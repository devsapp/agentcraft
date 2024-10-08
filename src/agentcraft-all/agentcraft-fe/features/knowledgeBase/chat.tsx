import { useKnowledgeBaseStore } from 'store/knowledgeBase';
import Conversation from 'components/Conversation';


export default function Home() {
    const currentKnowledgeBase = useKnowledgeBaseStore().currentKnowledgeBase;
    return (
        <Conversation version='v1' token={currentKnowledgeBase?.token || ''} id={currentKnowledgeBase?.id as number} keyword="测试会话"/>
    );
}