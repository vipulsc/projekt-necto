import { BrainCircuit, FileOutput, FileText, MoveRight } from "lucide-react";

type Step = {
  icon: React.ReactNode;
  label: string;
  description: string;
};

const steps: Step[] = [
  {
    icon: <FileText size={64} strokeWidth={1.5} className="text-rose-600" />,
    label: "Upload your PDF",
    description:
      "Upload your PDF file to the platform. We support all popular file formats.",
  },
  {
    icon: (
      <BrainCircuit size={64} strokeWidth={1.5} className="text-rose-600" />
    ),
    label: "AI Analysis",
    description:
      "Our AI will analyze the PDF and extract the most important information.",
  },
  {
    icon: <FileOutput size={64} strokeWidth={1.5} className="text-rose-600" />,
    label: "Get Summary",
    description:
      "Our AI will summarize the PDF and provide you with a clear, concise summary.",
  },
];
const Working = () => {
  return (
    <section className="relative overflow-hidden bg-rose-50">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
        >
          <div
            className="relative left-[calc(50%-3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-br from-[#ff80b5] via-[#c14d7a] to-[#852d51] opacity-20 sm:left-[calc(40%-30rem)] sm:w-[40.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="text-center mb-16">
          <h2 className="font-bold text-xl uppercase mb-4 text-rose-600">
            How it Works
          </h2>
          <h3 className="font-bold text-3xl max-w-2xl mx-auto px-4 sm:px-6">
            Quickly turn any PDF into a clear, concise summary in just three
            simple steps.
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative">
          {steps.map((step, index) => (
            <div className="relative flex items-stretch" key={index}>
              <StepItem {...step} />
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <MoveRight
                    size={32}
                    strokeWidth={1}
                    className="text-rose-400"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
function StepItem({ icon, label, description }: Step) {
  return (
    <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xs border border-white/10 hover:border-rose-600/50 transition-colors group w-full">
      <div className="flex flex-col gap-4 h-full">
        <div className="flex items-center justify-center h-24 w-24 mx-auto rounded-2xl bg-linear-to-br from-rose-500/10 to-transparent group-hover:from-rose-500/20 transition-colors">
          <div className="text-rose-600">{icon}</div>
        </div>
        <div className="flex flex-col flex-1 gap-1 justify-between">
          <h4 className="text-xl font-bold text-center">{label}</h4>
          <p className="text-sm text-center text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default Working;
