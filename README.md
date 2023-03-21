# UdemyDatingApp
Udemy course Dating App built with ASPNET Core and Angular infrastructure.


# Dependencies
Download and install .NET:  
https://dotnet.microsoft.com/en-us/download

If you are using Mac Apple Silicon Chip, install
.NET 6.0 for Arm64.

Download and install Node JS:  
https://nodejs.org/en/

You can use version 18.15.0 LTS  

### NuGet: Dotnet Entity Framework

https://www.nuget.org/packages/dotnet-ef/  

Run:
```shell
dotnet tool install --global dotnet-ef --version 7.0.4
```

## The Fundamentals

Configure your Git Access. I recommend using Git Credential Manager Core:
https://github.com/git-ecosystem/git-credential-manager/blob/release/docs/install.md

Run:
```shell
git credential-manager configure

git config --show-origin --get credential.helper
```

You can erase existing OSX Keychain credentials with:
```shell
git config --unset credential.helper

git credential-osxkeychain erase

[Press Return]
```

See: https://docs.github.com/en/get-started/getting-started-with-git/updating-credentials-from-the-macos-keychain

If you're running into issues, make sure you aren't using a repo that was originally 
configured for SSH, and you are now attempting to use the same repo with Git 
Credential Manager - this will be significantly more complex to configure.

# Helpful Quick References

## Visual Studio Code Tips and Tricks

Open Settings, search for "exclude", under "Files: Exclude", click on **Add Pattern**. Type
`**/bin` and click **OK**. And do the same for `**/obj`. This will hide these folders from the
Solution Explorer, since we won't interact with them very often.

Open the **Command Palette** with: `SHIFT + CMD + P` (MacOS).

Open the editor's **More Actions...** contextual menu with `CMD + .` (MacOS); this will provide 
you with helpful quick actions like "Remove unnecessary usings", or "Generate constructor".

Open the **Keyboard Shortcuts** window under Settings, then click on the small icon in the
top-right corner with tooltip "Open Keyboard Shortcuts (JSON)" (the icon looks like a piece
of paper with a folded corner, and a circular arrow on the left). In the `keybindings.json`
file, add this entry:

```json
{
    "key": "shift shift",
    "command": "workbench.action.quickOpen"
}
```

Save the `keybindings.json` file and then close it. Now, when you double-tap SHIFT, it will open
up a sort of "Global Object Search" form field, and you can type the name of an entity, like
our `AppUser.cs`, and then press RETURN to open the file. Super-handy to have!

More details:
https://stackoverflow.com/questions/29613191/intellij-shift-shift-shortcut-in-visual-studio-global-search

## Dotnet Commands

List currently installed tools:
```shell
dotnet tool list -g
```


## A Walking Skeleton
A Walking Skeleton is a tiny implementation of the system that performs a small 
end-to-end function. It need not use the final architecture, but it should link 
together the main architectural components.

The architecture and the functionality can then evolve in parallel.

- Alistair Cockburn

LEARNING GOALS
Implement the basic API functionality and have an introductory understanding of:

1. Using the dotnet CLI
2. API Controllers and Endpoints
3. Entity Framework
4. The API Project structure
5. Configuration and Environment variables
6. Source control

## Creating a New Project
Run:
```shell
dotnet --info

dotnet -h
```

Create new solution file and project file:
```shell
dotnet new sln

dotnet new webapi -n API

ls

dotnet sln -h

dotnet sln add API/

dotnet sln list
```

Open Visual Studio Code, do "Show All Commands" (SHIFT + CMD + P), type "PATH", 
select option: **Shell command: Install 'code' command in PATH.**

If you run into a "Permission Denied" error, try uninstalling it first.

Open project by running this in the Terminal:
```shell
code .
```

## Visual Studio Code Setup

Go to the Extensions tab (looks like 4 Tetris blocks), and search for "C#".

Install the **C# Extension** verified by Microsoft (powered by OmniSharp); you don't
need to install any "Recommended Extensions" right now.

It's recommended to turn on Auto Save functionality, under File menu (click 
on "Auto Save").

With the same C# Extension still visible, Right click on the Extension and click on 
"Extension Settings". It might say "No Settings Found" -- no worries. Open the 
**Command Palette** (SHIFT + CMD + P), and search for "Reload" and click on the 
"Reload Window" option.

Under the Extension Settings, scroll down (while on the "User" tab) and find these
settings:
1. Omnisharp: Enable Async Completion (EXPERIMENTAL)
2. Omnisharp: Enable Import Completion
3. Omnisharp: Organize Imports On Format

Click the checkboxes to enable all of these settings. You should get a Visual Studio
Code notification prompting you to **Restart OmniSharp**, go ahead and accept that to
restart the Extension.

You can "Toggle Terminal" with CTRL + Backtick (aka, Grave Accent; the key to the 
left of the "1" on your keyboard numbers row).

Back in the Extensions area, search for **C# Extensions**, and install the Extension 
maintained by **JosKreativ**. And, install **Material Icon Theme** by Philipp Kief (after) 
this is installed, you need to click on "Material Icon Theme" in the Command Palette 
area (it should automagically show up). You might need to click on **Set File Icon Theme**,
depending on your operating environment.

Optionally: Under Preferences > Settings, search for "compact", and turn off
"Explorer: Compact Folders".

Open the **Command Palette** (SHIFT + CMD + P) and type ".net", and click on:
".NET: Generate Assets for Build and Debug". This will create the `.vscode` directory
and the configuration files: `launch.json` and `tasks.json`.

## Running Project for the First Time
Toggle the **Terminal** (CTRL + Backtick), change directory to `API/` and then run:
```shell
dotnet run
```

On MacOS, you will probably be prompted with a Keychain request and will require your
password. Here's the output from the Terminal for reference:
```
Building...
warn: Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServer[5]
      The application is trying to access the ASP.NET Core developer certificate key. 
      A prompt might appear to ask for permission to access the key. When that happens, 
      select 'Always Allow' to grant 'dotnet' access to the certificate key in the future.
```

If you try to open the URL specified in your `Properties/launchSettings.json` file, like
https://localhost:7183/ -- you're not gonna see anything interesting right now, since our
"API" controller doesn't have any associated UI and it's just listening for API endpoints; 
you'll see something like this in your Browser:
```
This localhost page can’t be found
No webpage was found for the web address: https://localhost:7183/
HTTP ERROR 404
```

Examine the `WeatherForecastController.cs` (after modifications to the codebase, this file 
will no longer exist), and look at the `[Route]` property -- the String, `"Controller"` gets
removed from the class name, to build the URL for the endpoint.

### API URL in Browser
So the active URL for the project at this point in time is actually:  
https://localhost:5001/WeatherForecast  

When you view this URL, the browser should show the JSON contents of an
`IEnumerable<WeatherForecast>` like this:
```js
[{
    "date": "2023-03-16T17:54:14.96377-04:00",
    "temperatureC": 12,
    "temperatureF": 53,
    "summary": "Cool"
}, {
    "date": "2023-03-20T17:54:14.96394-04:00",
    "temperatureC": 39,
    "temperatureF": 102,
    "summary": "Chilly"
}]
```

Let's shut it down (CTRL + C) and then inspect the Help for dotnet: `dotnet run -h`.  

Based on the help docs, we can specify which launch profile we want to use, with a command
like: `dotnet run -lp "API"`. Note: You may run into a developer certificate issue, which
will be described in the **Terminal**; it should provide some suggested remediation steps, 
such as running `dotnet dev-certs https --clean`, which may require elevated privileges in
the Windows operating environment.  

In the `launchSettings.json` file, let's change the localhost ports within the `"applicationUrl"` 
element to 5001 and 5000, something like this:
```
"applicationUrl": "https://localhost:5001;http://localhost:5000"
```

Swagger won't be used for this project, so you can remove the `"launchUrl": "swagger"` entry. 
If you want to see a demonstration of it, you can add this property back, for reference:
```js
"profiles": {
  "API": {
    "commandName": "Project",
    "dotnetRunMessages": true,
    "launchBrowser": true,
    "launchUrl": "swagger",
    "applicationUrl": "https://localhost:5001;http://localhost:5000",
    "environmentVariables": {
      "ASPNETCORE_ENVIRONMENT": "Development"
    }
  },
```

And then navigate to: https://localhost:5001/swagger/index.html to see the automagically 
generated API documentation for the project. We're gonna be using a different tool to test 
our application.  

Inside our `API.csproj` file, it lists packages that we have installed. Let's get rid of
this `<ItemGroup>` element and its child entries, to simplify things:
```xml
<ItemGroup>
  <PackageReference Include="Swashbuckle.AspNetCore" Version="6.2.3" />
</ItemGroup>
```

After installing or uninstalling packages, you need to then run: `dotnet restore`. This
will result in some Project Errors we will fix now. Open `appsettings.Development.json` and
let's bump the AspNetCore level to `"Information"`:
```js
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Information"
    }
  }
}
```

Open the `Program.cs` file, and clean up the services container to look like this:
```cs
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.MapControllers();

app.Run();
```

Now let's run `dotnet watch run`. You should see a message like: `Hot reload enabled`. This feature 
to "Hot Reload" and re-deploy changes as you make them in the Editor can be finicky (sometimes it 
causes more problems than it solves).

## Entity Frameworks

What is it? An Object Relational Mapper (ORM), which translates our code into SQL commands that
update our tables in the database. Prior to .NET 3.5, we often used to write ADO.NET code to
save or retrieve data from underlying database. It was a cumbersome and error-prone process.

Entity Framework automates a lot of these database-related activities for our application.
When we introduce our Entity Framework, we need to create an important class that derives from
the `DbContext` class. This acts as a bridge between our domain and the database. This will
enable us to use LINQ (Link) queries.

Entity Framework works with database providers. The one we're going to use purely for development
is SQLite, which does require a database server -- it's not production-worthy, but it is
lightweight and portable, suitable for development (and something like SQL Server is not
cross-platform).

Entity framework enables querying the database with **LINQ**, and it supports **Change Tracking**
of entities, and allows us to **Save** our database. It also gives us optimistic **Concurrency**
to protect overwriting changes from another user, and database **Transactions**. And it supports
**Caching** and built-in **Conventions** (which govern how the model will be mapped to a database
schema), and **Configurations** for entities. It also offers us **Migrations**, to make our
database management more robust.

### Installing Nuget

Under Extensions, search for and install "NuGet Gallery" by pcislo.

Then, open the **Command Palette** (SHIFT + CMD + P), and search for "NuGet" and click on the
option that reads "NuGet: Open NuGet Gallery".

Look for "Microsoft.EntityFrameworkCore" by Microsoft, and scroll down to the `.Sqlite.Core`
package. Select the version of .NET you are using, you can run `dotnet --version` in the 
**Terminal**, and install the SQLite Core entity framework in the `API.csproj` file.

If you look at the `API.csproj` file, we should see a new entry like this:
```xml
<ItemGroup>
  <PackageReference Include="Microsoft.EntityFrameworkCore.Sqlite.Core" Version="7.0.4" />
</ItemGroup>
```

Back in the NuGet Gallery, look for "Microsoft.EntityFrameworkCore.Design" by Microsoft, and
install that also (using the same dotnet version). Then, the CS Project file should look like this:
```xml
<ItemGroup>
  <PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="7.0.4">
    <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
    <PrivateAssets>all</PrivateAssets>
  </PackageReference>
  <PackageReference Include="Microsoft.EntityFrameworkCore.Sqlite.Core" Version="7.0.4" />
</ItemGroup>
```

### Oops! Something isn't right...
We installed the wrong SQLite framework -- we wanted simply `Sqlite` instead of `Sqlite.Core`... 😩
Delete the `<PackageReference Include="Microsoft.EntityFrameworkCore.Sqlite.Core" Version="7.0.4" />`
package reference, then go back to NuGet Gallery and install:
```
Microsoft.EntityFrameworkCore.Sqlite by Microsoft
```

Double-check the `API.csproj` file to confirm we are ready to rock-and-roll. 🤟

### Entity Framework DbContext

From the docs:

> A DbContext instance represents a session with the database and can be used to query 
> and save instances of your entities. DbContext is a combination of the Unit Of Work and 
> Repository patterns.

Run:
```shell
dotnet ef migrations add InitialCreate -o Data/Migrations
```

Output:
```shell
Build started...
Build succeeded.
Done. To undo this action, use 'ef migrations remove'
```

Then run:
```shell
dotnet ef database update
```

Output snippets:
```shell
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (1ms) [Parameters=[], CommandType='Text', CommandTimeout='30']
      CREATE TABLE "__EFMigrationsHistory" (
          "MigrationId" TEXT NOT NULL CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY,
          "ProductVersion" TEXT NOT NULL
      );

SELECT COUNT(*) FROM "sqlite_master" WHERE "name" = '__EFMigrationsHistory' AND "type" = 'table';

info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (0ms) [Parameters=[], CommandType='Text', CommandTimeout='30']
      CREATE TABLE "Users" (
          "Id" INTEGER NOT NULL CONSTRAINT "PK_Users" PRIMARY KEY AUTOINCREMENT,
          "UserName" TEXT NULL
      );
```

### Installing a SQLite Browser Extension

Open the Extensions tool window, search for **SQLite**, and install the Extension 
maintained by **alexcvzz**.

Then, open the **Command Palette** (SHIFT + CMD + P), and search for "sqlite" and click on the
option that reads "SQLite: Open Database". Choose our database file: `API/datingapp.db`.

The UX design for this Extension has changed in subsequent versions of Visual Studio. As of this
writing, there should now be a "SQLITE EXPLORER" expandable menu at the bottom of the
**Solution Explorer** tool window (on the left sidebar).

Under the **SQLITE EXPLORER** menu, right-click on the "Users" table, and click on the
"New Query [Insert]" option. You should see this SQL statement in the editor window:
```sql
-- SQLite
INSERT INTO Users (Id, UserName)
VALUES ();
```

Copy the complete statement a few times, and then populate `VALUES()` with values:
```
1, "Bob"
2, "Tom"
3, "Jane"
```

Highlight the three queries in the editor, right-click, then click on the "Run Selected Query"
option. If you click the "Run" arrow next to the Users table, you should see output like:
```
+----+----------+
| Id | UserName |
+----+----------+
|  1 | Bob      |
|  2 | Tom      |
|  3 | Jane     |
+----+----------+
```
