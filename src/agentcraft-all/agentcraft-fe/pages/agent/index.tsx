import { AgentPage } from 'features/agent';
import { useWorkspaceStore } from 'store/workspace';
export default function AgentPageIndex() {
    const { currentWorkspace } = useWorkspaceStore();
    return (
        <AgentPage workspaceId={currentWorkspace} />
    );
}
