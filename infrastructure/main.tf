provider "aws" {
  region = var.aws_region
}

provider "vercel" {
  api_token = var.versel_token
}
#vercel projects
resource "vercel_project" "vpc_project" {
  name = "venice-project-center"
  framework = "nextjs"
  git_repository = {
    type="github"
    production_branch = "main"
    #change this latter to the vpc git account
    repo="nick-leslie/Venice-Project-Center-weboverhall"
  }
}
resource "vercel_project_environment_variable" "db_env"  {
  project_id = vercel_project.vpc_project.id
  target = ["production","preview","development"]
  key="DATABASE_URL"
  value=var.DATABASE_URL
}

resource "vercel_project_environment_variable" "file_url_env"  {
  project_id = vercel_project.vpc_project.id
  target = ["production","preview","development"]
  key="FILE_API_URL"
  value= "https://${aws_api_gateway_rest_api.vpc_file_api.id}.execute-api.${var.aws_region}.amazonaws.com"
}
resource "vercel_project_environment_variable" "jwt_secret"  {
  project_id = vercel_project.vpc_project.id
  target = ["production","preview","development"]
  key="JWT_SECRET"
  value= var.JWT_SECRET
}