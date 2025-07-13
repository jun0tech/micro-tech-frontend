import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormInput } from "@/components/ui/form-input";
import { FormTextarea } from "@/components/ui/form-textarea";
import { ROUTES } from "@/constants/routes";
import {
  useCreateProject,
  useProject,
  useUpdateProject,
} from "@/services/project/useProject";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building, Calendar, Loader2, Save } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

// Form validation schema
const projectSchema = z.object({
  name: z.string().min(2, "Project name must be at least 2 characters"),
  description: z.string().optional(),
  started_at: z.string().optional(),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export function CreateEditProject() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;
  const projectId = id ? parseInt(id, 10) : 0;

  // API hooks
  const { data: project, isLoading: isLoadingProject } = useProject(projectId);
  const { mutate: createProject, isPending: isCreating } = useCreateProject();
  const { mutate: updateProject, isPending: isUpdating } = useUpdateProject();

  const isPending = isCreating || isUpdating;

  // Form setup
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      description: "",
      started_at: "",
    },
  });

  // Populate form when editing
  useEffect(() => {
    if (isEditMode && project) {
      reset({
        name: project.name || "",
        description: project.description || "",
        started_at: project.started_at
          ? new Date(project.started_at).toISOString().split("T")[0]
          : "",
      });
    }
  }, [isEditMode, project, reset]);

  const onSubmit = async (data: ProjectFormValues) => {
    try {
      const formattedData = {
        name: data.name,
        description: data.description || undefined,
        started_at: data.started_at || undefined,
      };

      if (isEditMode) {
        updateProject(
          { id: projectId, data: formattedData },
          {
            onSuccess: () => {
              toast.success("Project updated successfully");
              navigate(ROUTES.APP.PROJECTS.VIEW(projectId));
            },
            onError: (error) => {
              toast.error("Failed to update project");
              console.error("Update error:", error);
            },
          }
        );
      } else {
        createProject(formattedData, {
          onSuccess: (response) => {
            toast.success("Project created successfully");
            // Assuming the API returns an array with the created project
            const createdProject = Array.isArray(response)
              ? response[0]
              : response;
            if (createdProject?.id) {
              navigate(ROUTES.APP.PROJECTS.VIEW(createdProject.id));
            } else {
              navigate(ROUTES.APP.PROJECTS.LIST);
            }
          },
          onError: (error) => {
            toast.error("Failed to create project");
            console.error("Create error:", error);
          },
        });
      }
    } catch (error) {
      toast.error(
        isEditMode ? "Failed to update project" : "Failed to create project"
      );
      console.error("Form submission error:", error);
    }
  };

  if (isEditMode && isLoadingProject) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  if (isEditMode && !isLoadingProject && !project) {
    return (
      <div className="container mx-auto py-6">
        <div className="text-center py-12">
          <p className="text-red-600">Project not found or failed to load.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={ROUTES.APP.PROJECTS.LIST}>
              Projects
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {isEditMode && project && (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink href={ROUTES.APP.PROJECTS.VIEW(project.id)}>
                  {project.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          )}
          <BreadcrumbItem>
            <BreadcrumbPage>
              {isEditMode ? "Edit Project" : "New Project"}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="bg-blue-100 p-3 rounded-lg">
          <Building className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditMode
              ? `Edit ${project?.name || "Project"}`
              : "Create New Project"}
          </h1>
          <p className="text-gray-600 mt-1">
            {isEditMode
              ? "Update project information and settings"
              : "Fill in the details to create a new project"}
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5 text-blue-600" />
                Project Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <FormInput
                  id="name"
                  name="name"
                  label="Project Name"
                  placeholder="Enter project name"
                  control={control}
                  required
                  helperText="A descriptive name for your project"
                />

                <FormTextarea
                  id="description"
                  name="description"
                  label="Description"
                  placeholder="Enter project description (optional)"
                  control={control}
                  rows={4}
                  helperText="Provide additional details about the project"
                />

                <FormInput
                  id="started_at"
                  name="started_at"
                  label="Start Date"
                  type="date"
                  control={control}
                  helperText="When did or will the project start?"
                />

                <div className="flex justify-end space-x-3 pt-6">
                  <Link
                    to={
                      isEditMode && project
                        ? ROUTES.APP.PROJECTS.VIEW(project.id)
                        : ROUTES.APP.PROJECTS.LIST
                    }
                  >
                    <Button variant="outline" type="button">
                      Cancel
                    </Button>
                  </Link>
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        {isEditMode ? "Updating..." : "Creating..."}
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        {isEditMode ? "Update Project" : "Create Project"}
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar with additional info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-green-600" />
                Project Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Project Name</h4>
                <p className="text-sm text-gray-600">
                  Choose a clear, descriptive name that identifies the project
                  uniquely.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                <p className="text-sm text-gray-600">
                  Provide context about the project scope, objectives, and key
                  details.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Start Date</h4>
                <p className="text-sm text-gray-600">
                  Set the official start date for project tracking and
                  reporting.
                </p>
              </div>
            </CardContent>
          </Card>

          {isEditMode && project && (
            <Card>
              <CardHeader>
                <CardTitle>Project Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Created
                  </label>
                  <p className="text-sm text-gray-900">
                    {project.created_at
                      ? new Date(project.created_at).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )
                      : "Not available"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Project ID
                  </label>
                  <p className="text-sm text-gray-900">#{project.id}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
