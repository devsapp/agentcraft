import Conversation from 'components/Conversation';
import { useAssistantStore } from 'store/assistant';

export default function Chat() {
    const currentAssistant = useAssistantStore().currentAssistant;
    return (
        <Conversation version='v2' token={currentAssistant?.token || ''} status={0} />
    );
}
