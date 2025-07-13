import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { Building } from "lucide-react";
import { Link } from "react-router";

interface ProjectCardProps {
  project: {
    id: number;
    name: string;
    procurements: number;
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-center mb-4">
        <div className="bg-blue-100 p-3 rounded-lg mr-3">
          <Building className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h3 className="font-semibold">{project.name}</h3>
          <p className="text-sm text-gray-500">
            {project.procurements} Procurements
          </p>
        </div>
      </div>

      <div className="flex space-x-2">
        <Link to={ROUTES.APP.PROJECTS.VIEW(project.id)} className="flex-1">
          <Button
            variant="outline"
            className="w-full text-center py-2 px-4 text-sm font-medium border border-blue-600 text-blue-600 bg-white rounded-md hover:bg-blue-50"
          >
            View Details
          </Button>
        </Link>
        <Link to={ROUTES.APP.INVENTORY.NEW} className="flex-1">
          <Button className="w-full text-center py-2 px-4 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Add Items
          </Button>
        </Link>
      </div>
    </div>
  );
}
