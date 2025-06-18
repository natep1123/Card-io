import Analytics from "@/components/Analytics";

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-slate text-white flex flex-col items-center px-4">
      <h2 className="text-4xl font-bold mb-4">Workout Analytics</h2>
      <p className="text-lg text-gray mb-6">
        Check out your progress over time!
      </p>
      <Analytics />
    </div>
  );
}
