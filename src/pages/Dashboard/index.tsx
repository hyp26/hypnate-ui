import { useAuth} from "../../hook/useAuth";
import Navbar from "../../components/navbar";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-semibold">
          Welcome, {user?.name || "Seller"}!
        </h1>
        <p className="mt-2 text-gray-600">Your dashboard is ready.</p>
      </div>
    </div>
  );
}