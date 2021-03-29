
Get Started

Backend:

1. Install docker if not installed.

2. pull ms sql docker image: docker pull mcr.microsoft.com/mssql/server


3. Execute docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=TheStrongestPassword" \
   -p 1433:1433 --name sql1 -h sql1 \
   -d mcr.microsoft.com/mssql/server

4. Connect to database: localhost

5. In the Service Project run migrations:

	dotnet ef migrations add InitialCreate
	dotnet ef database update

6. In the service project execute the command: dotnet run

FrontEnd

1. In the root of the project execute: npm install

2. Run the command: npm start



