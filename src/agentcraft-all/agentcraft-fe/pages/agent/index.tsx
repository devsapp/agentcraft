import { AgentPage } from 'features/agent';
import { useLocalWorkspaceStore } from 'store/workspace';
export default function AgentPageIndex() {
    const { currentWorkspace } = useLocalWorkspaceStore();
    return (
        <AgentPage workspaceId={currentWorkspace} />
    );
}
