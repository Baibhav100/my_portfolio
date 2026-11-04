import AIEdgeCaseDetector from "../components/AIEdgeCaseDetector";

export const metadata = {
  title: "AI Lab | Baibhav Rajkumar",
  description:
    "Interactive AI Edge-Case Detector — upload an image, watch Gemini Vision analyze it, and step in when the AI is uncertain. A live demo of Human-in-the-Loop AI.",
};

export default function AILabPage() {
  return <AIEdgeCaseDetector />;
}

