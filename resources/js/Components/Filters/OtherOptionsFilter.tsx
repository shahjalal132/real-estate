interface OtherOptionsFilterProps {
    brokerAgentCoOp: boolean;
    ownerUser: boolean;
    onBrokerAgentCoOpChange: (value: boolean) => void;
    onOwnerUserChange: (value: boolean) => void;
}

export default function OtherOptionsFilter({
    brokerAgentCoOp,
    ownerUser,
    onBrokerAgentCoOpChange,
    onOwnerUserChange,
}: OtherOptionsFilterProps) {
    return (
        <div>
            <label className="mb-2 block text-xs font-semibold text-gray-900">
                Other Options
            </label>
            <div className="space-y-1.5">
                <label className="flex cursor-pointer items-center gap-1.5 rounded p-1.5 hover:bg-gray-50 transition-colors">
                    <input
                        type="checkbox"
                        checked={brokerAgentCoOp}
                        onChange={(e) =>
                            onBrokerAgentCoOpChange(e.target.checked)
                        }
                        className="h-3.5 w-3.5 rounded border-gray-300 text-[#0066CC] focus:ring-[#0066CC] accent-[#0066CC]"
                    />
                    <span className="text-xs text-gray-700">
                        Broker/Agent Co-Op
                    </span>
                </label>
                <label className="flex cursor-pointer items-center gap-1.5 rounded p-1.5 hover:bg-gray-50 transition-colors">
                    <input
                        type="checkbox"
                        checked={ownerUser}
                        onChange={(e) => onOwnerUserChange(e.target.checked)}
                        className="h-3.5 w-3.5 rounded border-gray-300 text-[#0066CC] focus:ring-[#0066CC] accent-[#0066CC]"
                    />
                    <span className="text-xs text-gray-700">Owner/User</span>
                </label>
            </div>
        </div>
    );
}
