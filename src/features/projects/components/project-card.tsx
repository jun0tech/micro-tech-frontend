import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";
import type { Project } from "@/services/types/api";
import { Building, Calendar, Edit, Eye, MoreVertical } from "lucide-react";
import { Link } from "react-router";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Not set";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getProjectStatus = (project: Project) => {
    // Add logic to determine project status based on dates or other fields
    if (project.started_at) {
      return "Active";
    }
    return "Planning";
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "planning":
        return "bg-yellow-100 text-yellow-800";
      case "on-hold":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const status = getProjectStatus(project);

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Building className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-1">
                {project.name}
              </CardTitle>
              <Badge className={getStatusColor(status)} variant="secondary">
                {status}
              </Badge>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Description */}
        {project.description && (
          <p className="text-sm text-gray-600 line-clamp-2">
            {project.description}
          </p>
        )}

        {/* Project Details */}
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Created: {formatDate(project.created_at)}</span>
          </div>
          {project.started_at && (
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Started: {formatDate(project.started_at)}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-4 border-t">
          <Link to={ROUTES.APP.PROJECTS.VIEW(project.id)} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Button>
          </Link>
          <Link to={ROUTES.APP.PROJECTS.EDIT(project.id)} className="flex-1">
            <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
