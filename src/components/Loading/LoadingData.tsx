import LoadingSpinner from "@/components/Loading/LoadingSpinner";

function LoadingData() {
  return (
    <div className="flex flex-auto justify-center items-center gap-2">
      Loading Data <LoadingSpinner />
    </div>
  );
}

export default LoadingData;
