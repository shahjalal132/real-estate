import ComingSoonPage from "../ComingSoon";
import { Bot } from "lucide-react";

export default function ChatGPTAssistant() {
    return (
        <ComingSoonPage
            title="AI Assistant"
            description="Chat with our AI assistant for property insights and assistance"
            features={[
                "Property analysis assistance",
                "Market insights",
                "Document generation",
            ]}
            icon={Bot}
        />
    );
}

