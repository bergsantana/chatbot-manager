 
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 5179
 
 
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

COPY ["ChatbotManager.csproj", "./"]
RUN dotnet restore "ChatbotManager.csproj"
COPY . .
RUN dotnet publish "ChatbotManager.csproj" -c Release -o /app/publish

# Final image
FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "ChatbotManager.dll"]