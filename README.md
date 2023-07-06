# UdemyDatingApp
Udemy course Dating App built with ASPNET Core and Angular infrastructure.


# Dependencies
Download and install .NET:  
https://dotnet.microsoft.com/en-us/download

If you are using Mac Apple Silicon Chip, install
.NET 6.0 for Arm64.

Download and install Node JS:  
https://nodejs.org/en/

Edit: ~~You can use version 18.15.0 LTS~~ For this Udemy course you need to use Node
version 16, which is available for download here:  
https://nodejs.org/download/release/v16.10.0/

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

## Angular App and API Quick Start

In one VS Code Terminal, `cd API/` then run:
```
dotnet watch --no-hot-reload
```

And in another Terminal instance, `cd client` then run:
```
kill -9  $(lsof -t -i:4200);ng serve
ng serve
```

Now both services (API server and client app) will be running. Open this URL in a browser:  
https://localhost:4200/


## Visual Studio Code Tips and Tricks

Open Settings, search for "exclude", under "Files: Exclude", click on **Add Pattern**. Type
`**/bin` and click **OK**. And do the same for `**/obj`. This will hide these folders from the
Solution Explorer, since we won't interact with them very often.

Within Settings, search for "bracket" and make sure these two settings are Enabled:
- Auto Closing Brackets - Always
- Bracket Pair Colorization: Enabled - Checked
- Bracket Pair Colorization: Independent Color Pool Per Bracket Type - Unchecked
- Guides: Bracket Pairs - True

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
> A Walking Skeleton is a tiny implementation of the system that performs a small 
> end-to-end function. It need not use the final architecture, but it should link 
> together the main architectural components.
> 
> The architecture and the functionality can then evolve in parallel.
> 
> - Alistair Cockburn

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


# Visual Studio Code Setup

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

Click the checkboxes to enable all of these settings.

Look for "Private Member Prefix" and input `_` (underscore) and turn off the 
"Use This For Ctor Assignments" checkbox.

You should get a Visual Studio Code notification prompting you to **Restart OmniSharp**, 
go ahead and accept that to restart the Extension.

You can "Toggle Terminal" with CTRL + Backtick (aka, Grave Accent; the key to the 
left of the "1" on your keyboard numbers row).

Back in the Extensions area, search for **C# Extensions**, and install the Extension 
maintained by **JosKreativ**. And, install **Material Icon Theme** by Philipp Kief (after) 
this is installed, you need to click on "Material Icon Theme" in the Command Palette 
area (it should automagically show up). You might need to click on **Set File Icon Theme**,
depending on your operating environment.

Optionally: Under Preferences > Settings, search for "compact", and turn off
"Explorer: Compact Folders".  

Also install **GitLens - Git supercharged** by GitKraken if you want Git line annotations.  

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


### Troubleshooting Dotnet Runtime

If you encounter this error:
```
System.IO.IOException: Failed to bind to address https://127.0.0.1:5001: address already in use.
```

You can try running:
```
lsof -i:5001
```

Example output:
```
Google    36572 john   70u  IPv6 0x1223c1a0ae0e2ced  0t0  TCP localhost:60565->localhost:commplex-link (ESTABLISHED)
API       96825 john  244u  IPv4 0x1223c1aa43f9eee5  0t0  TCP localhost:commplex-link (LISTEN)
API       96825 john  245u  IPv6 0x1223c1a0ae0e3bed  0t0  TCP localhost:commplex-link (LISTEN)
API       96825 john  256u  IPv6 0x1223c1a0ae0c436d  0t0  TCP localhost:commplex-link->localhost:60565 (ESTABLISHED)
```

Then run `kill -9 <pid>` to manually kill the leftover "API" processes. In the above example, it 
should be: `kill -9 96825`.

Then run `dotnet watch run` or `dotnet run`, then navigate to:  
https://localhost:5001/api/users

You should see this output in the Browser UI:
```json
[{
  "id": 1,
  "userName": "Bob"
}, {
  "id": 2,
  "userName": "Tom"
}, {
  "id": 3,
  "userName": "Jane"
}]
```

For API testing, it's more efficient to use Postman. Go ahead and create a new Postman Workspace 
named "UdemyDatingApp", and add a Collection called "Users", and add a Request called "Get Users".  

Set the request URL to: https://localhost:5001/api/users  

If you get an error like "Could not get response -- SSL Error: Unable to verify the first certificate",
go to Settings (Preferences) and turn off "SSL Certificate Verification".


# Entity Frameworks

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


## Installing Nuget

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


### NuGet: Installing Identity Model Tokens JWT

Open the **Command Palette** (SHIFT + CMD + P), and search for "NuGet" and click on the
option that reads "NuGet: Open NuGet Gallery".

Look for "system.identity", and install "System.IdentityModel.Tokens.Jwt" by Microsoft.
I selected version `6.24.0`.

Look for "microsoft.aspnetcore.authentication", and install 
"Microsoft.AspNetCore.Authentication.JwtBearer" by Microsoft.
I selected version `6.0.10`.


### NuGet: Installing AutoMapper

Open the **Command Palette** (SHIFT + CMD + P), and search for "NuGet" and click on the
option that reads "NuGet: Open NuGet Gallery".

Look for "automapper", and install "AutoMapper.Extensions.Microsoft.DependencyInjection" 
by Jimmy Bogard. I selected version `12.0.0`.


## Installing Angular Language Service

Under Extensions, search for and install "Angular Language Service" by Angular.

This extension provides a rich editing experience for Angular templates, both inline and external 
templates including:
- Completions lists
- AOT Diagnostic messages
- Quick info
- Go to definition


## Entity Framework DbContext

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


## Installing a SQLite Browser Extension

Open the Extensions tool window, search for **SQLite**, and install the Extension 
maintained by **alexcvzz**.

Then, open the **Command Palette** (SHIFT + CMD + P), and search for "sqlite" and click on the
option that reads "SQLite: Open Database". Choose our database file: `API/datingapp.db`.

The UX design for this Extension has changed in subsequent versions of Visual Studio. As of this
writing, there should now be a "SQLITE EXPLORER" expandable menu at the bottom of the
**Solution Explorer** tool window (on the left sidebar).


### Inserting Test Values in SQL Users Table

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


## Multithreading

We wrap the `ActionResult` return types with `Task<>`, with documentation that reads:
> Represents an asynchronous operation that can return a value.

And we pair this with the `await` keyword:
> This async method lacks 'await' operators and will run synchronously. Consider using the 
> 'await' operator to await non-blocking API calls, or 'await Task.Run(...)' to do CPU-bound work 
> on a background thread.

If you get an error like this when testing the API:
```
Microsoft.AspNetCore.Routing.Matching.AmbiguousMatchException: 
  The request matched multiple endpoints. Matches: 

API.Controllers.UsersController.GetUser (API)
API.Controllers.UsersController.GetUser (API)
  at Microsoft.AspNetCore.Routing.Matching.DefaultEndpointSelector.ReportAmbiguity(CandidateState[] candidateState)
  at Microsoft.AspNetCore.Routing.Matching.DefaultEndpointSelector.ProcessFinalCandidates(HttpContext httpContext, CandidateState[] candidateState)
  at Microsoft.AspNetCore.Routing.Matching.DfaMatcher.MatchAsync(HttpContext httpContext)
  at Microsoft.AspNetCore.Routing.EndpointRoutingMiddleware.Invoke(HttpContext httpContext)
  at Microsoft.AspNetCore.Diagnostics.DeveloperExceptionPageMiddlewareImpl.Invoke(HttpContext context)

HEADERS
=======
Accept: */*
Connection: keep-alive
Host: localhost:5001
User-Agent: PostmanRuntime/7.31.1
Accept-Encoding: gzip, deflate, br
```

It is likely a failure relating to the "Hot Reload" feature used by `dotnet watch run`. You'll
need to shut down the dotnet runtime and restart it.


# Angular Framework

## Learning Goals

Complete the walking skeleton and have an introductory understanding of:
1. Using the Angular CLI
2. How to create a new Angular app
3. The Angular project files
4. The Angular bootstrap process
5. Using the Angular HTTP Client Service
6. Running an Angular app over HTTPS
7. How to add packages using NPM

We will be using Angular to create a SPA (Single Page Application).


## Angular CLI Initial Setup

Check versions with:
```shell
node --version

npm --version
```

Then let's install Angular version 14:
```shell
npm install -g @angular/cli@14
```

If you get this sort of error:
```
npm ERR! code EACCES
npm ERR! syscall mkdir
npm ERR! path /usr/local/lib/node_modules/@angular
npm ERR! errno -13
npm ERR! Error: EACCES: permission denied, mkdir '/usr/local/lib/node_modules/@angular'
npm ERR!  [Error: EACCES: permission denied, mkdir '/usr/local/lib/node_modules/@angular'] {
npm ERR!   errno: -13,
npm ERR!   code: 'EACCES',
npm ERR!   syscall: 'mkdir',
npm ERR!   path: '/usr/local/lib/node_modules/@angular'
npm ERR! }
npm ERR! 
npm ERR! The operation was rejected by your operating system.
npm ERR! It is likely you do not have the permissions to access this file as the current user
npm ERR! 
npm ERR! If you believe this might be a permissions issue, please double-check the
npm ERR! permissions of the file and its containing directories, or try running
npm ERR! the command again as root/Administrator.
```

You may need to run the command again, prefixed with `sudo`

After successful installation, run this to see the Angular details:
```
ng version
```

Which will have output like:
```
     _                      _                 ____ _     ___
    / \   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
   / △ \ | '_ \ / _` | | | | |/ _` | '__|   | |   | |    | |
  / ___ \| | | | (_| | |_| | | (_| | |      | |___| |___ | |
 /_/   \_\_| |_|\__, |\__,_|_|\__,_|_|       \____|_____|___|
                |___/
    

Angular CLI: 14.2.11
Node: 16.10.0
Package Manager: npm 7.24.0 
OS: darwin arm64

Angular: 
... 

Package                      Version
------------------------------------------------------
@angular-devkit/architect    0.1402.11 (cli-only)
@angular-devkit/core         14.2.11 (cli-only)
@angular-devkit/schematics   14.2.11 (cli-only)
@schematics/angular          14.2.11 (cli-only)
```

Next run:
```
ng new client
```
Which will create a `client/` directory alongside our existing `API/` folder.

Choose **Yes** for "Would you like to add Angular routing?", and choose **CSS** for 
our stylesheet format.

If you run into errors, try uninstalling the CLI and re-creating the `client` with:
```
rm -r client/

npm cache clean --force
npm uninstall -g @angular/CLI

sudo chown -R 505:20 "/usr/local/lib/node_modules"

sudo npm install -g @angular/cli@14

npm -v

ng version

sudo ng new client
```

You should eventually see:
```
CREATE client/src/app/app.component.css (0 bytes)
CREATE client/src/app/app.component.html (23115 bytes)
CREATE client/src/app/app.component.spec.ts (1073 bytes)
CREATE client/src/app/app.component.ts (210 bytes)
✔ Packages installed successfully.
    Directory is already under version control. Skipping initialization of git.
```

This might take a couple of minutes to download all the dependencies -- be patient 😉

To run the Angular client app, navigate to the `client` dir with `cd client`,
and then run `ng serve`.

If you run into `Error: EACCES: permission denied, mkdir` errors, then try manually
creating the `.angular` directory and elevating the permissions for the `client` dir:
```
sudo chmod -R 755 client/
sudo chmod -R 775 /usr/local/lib/node_modules/

cd client
mkdir .angular
```

When you successfully run `ng serve`, you should see terminal output like this:
```
✔ Browser application bundle generation complete.

Initial Chunk Files   | Names         |  Raw Size
vendor.js             | vendor        |   2.12 MB | 
polyfills.js          | polyfills     | 318.00 kB | 
styles.css, styles.js | styles        | 210.08 kB | 
main.js               | main          |  49.83 kB | 
runtime.js            | runtime       |   6.51 kB | 

                      | Initial Total |   2.69 MB

Build at: 2023-03-24T23:10:11.568Z - Hash: da54282da5c1aa00 - Time: 5577ms

** Angular Live Development Server is listening on localhost:4200, open your 
browser on http://localhost:4200/ **
```

If we inspect the app root component, called `app.component.ts`, we will see a decorator
called `@Component` that specifies the `app-root` that is declared in the `index.html` file.

Files with the `ts` prefix or suffix utilize TypeScript:  
https://www.typescriptlang.org/  


# Configuring our Angular SPA

The `OnInit` interface is described as:
> A lifecycle hook that is called after Angular has initialized all data-bound properties of 
> a directive. Define an ngOnInit() method to handle any additional initialization tasks.

Our `AppComponent` within the `app.module.ts` TypeScript file implements this interface.

We'll need two Terminal instances; one to run our `client` app, and one to run our `API`.
Under the Terminal tab, you can click the "Plus (+)" button to create another instance,
and then they'll be shown in the right sidebar.  

In one Terminal, `cd API` then `dotnet watch run`. In the other Terminal, `cd client` then
`ng serve`. Now both services will be running.  

Early on, if we run our application with:
```js
ngOnInit(): void {
  this.http.get('https://localhost:5001/api/users').subscribe({
    next: response => this.users = response,
    error: error => console.log(error),
    complete: () => console.log('Request has completed')
  })
}
```

Open up the DevTools Window by right-clicking in the Browser and clicking on "Inspect", 
and we will get a CORS policy error:  
https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

```
Access to XMLHttpRequest at 'https://localhost:5001/api/users' from origin 
'http://localhost:4200' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' 
header is present on the requested resource.
```

> Cross-Origin Resource Sharing (CORS) is an HTTP-header based mechanism that allows a server 
> to indicate any origins (domain, scheme, or port) other than its own from which a browser should 
> permit loading resources. CORS also relies on a mechanism by which browsers make a "preflight" 
> request to the server hosting the cross-origin resource, in order to check that the server will 
> permit the actual request. In that preflight, the browser sends headers that indicate the HTTP 
> method and headers that will be used in the actual request.

For development purposes, we can fix this by adding this CORS builder to the `Program.cs`:
```csharp
app.UseCors(builder => builder
    .AllowAnyHeader()
    .AllowAnyMethod()
    .WithOrigins("http://localhost:4200"));
```

Once this change goes live, we should now see this Header present in our API response:
```
Access-Control-Allow-Origin: http://localhost:4200
```
Which will allow all responses from the 4200 server access port number.


## Angular NG Directives

The documentation for `*ngFor` reads:
> A structural directive that renders a template for each item in a collection. The directive 
> is placed on an element, which becomes the parent of the cloned templates.
> 
> The `ngForOf` directive is generally used in the shorthand form `*ngFor`. In this form, the 
> template to be rendered for each iteration is the content of an anchor element containing 
> the directive.


## Angular Schematics

A schematic is a template-based code generator that supports complex logic. It is a set 
of instructions for transforming a software project by generating or modifying code. 
Schematics are packaged into collections and installed with npm.

Schematics are part of the Angular ecosystem. The Angular CLI uses schematics to apply 
transforms to a web-app project. You can modify these schematics, and define new ones 
to do things like update your code to fix breaking changes in a dependency, for example, 
or to add a new configuration option or framework to an existing project.

Schematics that are included in the `@schematics/angular` collection are run by default 
by the commands `ng generate` and `ng add`.  

https://angular.io/guide/schematics  


## Installing NGX Bootstrap

Installation instructions are here:
https://valor-software.com/ngx-bootstrap/#/documentation#installation  

But at the time of this writing, if we try to run:
```
ng add ngx-bootstrap
```

It will fail with an error (since ngx-bootstrap version 9.0.0 is not compatible with
Angular CLI version 14). So instead, let's run these commands (make sure you are in the
`client/` directory) with versions explicitly declared:
```
npm install ngx-bootstrap@9

npm install bootstrap@5
```

And let's install a font package to make our UI classy:
```
npm install font-awesome
```

And let's also install NGX Spinner:
```
npm install ngx-spinner@14.0.0 --save
```

See also:  
https://github.com/Napster2210/ngx-spinner  
https://napster2210.github.io/ngx-spinner/  

**June 22, 2023 Update**: I ran `npm audit fix` which updated a few of the dependencies
that were reported with vulnerabilities and changed the contents of `package-lock.json`.


## Using HTTPS in Angular (MacOS)

Inside our `client/ssl/` folder, there are two files:
```
server.crt
server.key
```

Double-click on the `server.crt` file to install it as a `localhost` certificate in the
MacOS Keychain Access, under the "login" option in the left sidebar (it won't show up
if you have "System" or "System Roots" selected).  

These are the detailed installation instructions:
1. Double click on the certificate (`server.crt`)
2. Select your desired keychain (**login** should suffice)
3. Add the certificate
4. Open **Keychain Access** if it isn't already open
5. Select the keychain you chose earlier
6. You should see the certificate **localhost**
7. Double click on the certificate
8. Expand **Trust**
9. Select the option **Always Trust** in **When using this certificate**
10. Close the certificate window

The certificate should now be installed. This certificate was generated using this 
`openssl-custom.cnf` configuration:
```
[req]
default_bits = 2048
prompt = no
default_md = sha256
x509_extensions = v3_req
distinguished_name = dn

[dn]
C = US
ST = KS
L = Olathe
O = IT
OU = IT Department
emailAddress = webmaster@example.com
CN = localhost

[v3_req]
subjectAltName = @alt_names

[alt_names]
DNS.1 = *.localhost
DNS.2 = localhost
```

With Shell command:
```shell
#!bin/bash

openssl req \
    -newkey rsa:2048 \
    -x509 \
    -nodes \
    -keyout server.key \
    -new \
    -out server.crt \
    -config ./openssl-custom.cnf \
    -sha256 \
    -days 7300
```


# Authentication Basics

## Authentication: Learning Goals

Implement basic authentication in our app and have an understanding of:
1. How to store passwords in the Database
2. Using inheritance in C# - DRY (Don't Repeat Yourself)
3. Using the C# debugger
4. Using Data Transfer Objects (DTOs)
5. Validation
6. JSON Web Tokens (JWTs)
7. Using services in C#
8. Middleware
9. Extension methods - DRY


## Where do I start?

Requirements:
- Users should be able to log in
- Users should be able to register
- Users should be able to view other users
- Users should be able to privately message other users

We're going to Hash and Salt user passwords to demonstrate the basic concepts of authentication.
This isn't a battle-hardened, bullet-proof solution; this is just one step above adding 
completely fake authentication. It just gives us the concept of how authentication works in 
a very visible way that we can code ourselves.  

Read more about security vulnerabilities, attack vectors, brute force attacks, access controls, 
rainbow tables and other software security concepts here:  
https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html  
https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/  
https://attack.mitre.org/techniques/enterprise/  
https://security.stackexchange.com/questions/35523/is-salting-a-hash-really-as-secure-as-common-knowledge-implies  
https://www.authgear.com/post/password-hashing-salting  


## Authentication FAQs

Safe storage of passwords:

1. Why don't we use ASP.NET Identity?
2. Why are we storing the **Password Salt** in the Database? Isn't this less secure?

Don't worry! Later on we will refactor to the widely used and battle-hardened ASP.NET
Core Identity: https://learn.microsoft.com/en-us/aspnet/core/security/authentication/identity


## API Controller Basics

By default, an API function written like this:
```cs
public async Task<ActionResult<AppUser>> Register(string username, string password)
```

Derives the parameters from the URL Query Params, like `?username=foo&password=bar`.

If we wanted to use query params, we would need to specify the attribute `[FromBody]`. 
However, we're going to use the power of the `[ApiController]` attribute, and use a DTO 
called `RegisterDto` instead.


### JSON Web Tokens (JWT)

Industry standard for tokens (RFC 7519). They are self-contained and can contain:
- Credentials
- Claims
- Other information

Benefits of JWT:
- No session to manage; JWTs are self-contained tokens
- Portable; A single token can be used with multiple backends
- No Cookies are required; Mobile friendly
- Performance; Once a token is issued, there is no need to make a database request
  to verify a user's authentication

In its compact form, JSON Web Tokens consist of three parts separated by dots (`.`), 
which are:
- Header
- Payload
- Verify Signature

Therefore, a JWT typically looks like the following:
```
xxxxx.yyyyy.zzzzz
```

Header:
```
{
  "alg": "HS256",
  "typ": "JWT"
}
```

Payload:
```
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true
}
```

Signature:
```
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
```

Read more here: https://jwt.io/introduction  


### Debugger Basics

To add a debugger breakpoint, just click to the left of the line number you want
execution to break (stop). This will create a small Red Dot in the IDE Editor window.  

To run and debug our API, click on the **Run and Debug** tool window (SHIFT + CMD + D),
and then click on the Play button next to **.NET Core Launch (web)** located in the 
top-left corner of the IDE.  

You can also Attach the debugger to an already-running API instance (note: this will
not work when using Hot Reload). The list of "debuggable processes" is often quite 
large, so you can search the list for "API" and then click on the appropriate Process ID.  

In Windows environments the debuggable process might be named `API.exe`.


### Development JWT TokenKey

In the `appsettings.Development.json` local configuration file, add this property:
```js
"TokenKey": "super secret unguessable key"
```

When we call our new and improved Login API, a successful login response will have a 
`"token"` property that looks like this:
```js
{
    "username": "jim",
    "token": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJqaW0iLCJuYmYiOjE2ODAyOTgwOTksImV4cCI6MTY4MDkwMjg5OSwiaWF0IjoxNjgwMjk4MDk5fQ.1qccJUbwCaZUpX2LoB_e2QuikREfpmJc0bWFmfQ61PGBSfYQVegc_o-RVVV4ig3-7QV9AbHX9l3skvbDmO_ckg"
}
```

If we go to https://jwt.ms/ and paste the token in there, we will see a Decoded Token
like:
```
{
  "alg": "HS512",
  "typ": "JWT"
}.{
  "nameid": "jim",
  "nbf": 1680298099,
  "exp": 1680902899,
  "iat": 1680298099
}.[Signature]
```


# Client Login and Register

## Client Login and Register: Learning Goals

Implement the login and register functionality into the apps as well as understanding:
1. Creating components using the Angular CLI
2. Using Angular Template forms
3. Using Angular services
4. Understanding Observables
5. Using Angular structural directives to conditionally display elements on a page
6. Component communication from parent to child
7. Component communication from child to parent


## Creating a Nav Bar

Bootstrap 5.2 Examples: https://getbootstrap.com/docs/5.2/examples/  

```html
<nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Carousel</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarCollapse">
      <ul class="navbar-nav me-auto mb-2 mb-md-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled">Disabled</a>
        </li>
      </ul>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
```

```shell
~/GitProjects/UdemyDatingApp/client % ng g --help

~/GitProjects/UdemyDatingApp/client % ng g component nav --dry-run
CREATE src/app/nav/nav.component.css (0 bytes)
CREATE src/app/nav/nav.component.html (18 bytes)
CREATE src/app/nav/nav.component.spec.ts (578 bytes)
CREATE src/app/nav/nav.component.ts (263 bytes)
UPDATE src/app/app.module.ts (541 bytes)
```

Run this command to create the Nav Bar component:
```
ng g component nav --skip-tests
```

NGX Bootstrap Dropdown component:  
https://valor-software.com/ngx-bootstrap/#/components/dropdowns?tab=overview


## What are Observables?

New standard for managing async data included in ES7 (ECMAScript 2016):  
https://www.w3schools.io/javascript/es7-features-introduction/  
https://github.com/tc39/proposals  

Observables were introduced in Angular v2, and everything that is asynchronous in Angular 
uses Observables. For browser backwards compatibility, there is a compiler called Babel 
that can assist.  
https://babeljs.io/  

`Observables` are lazy collections of multiple values over time. We can use them to stream
data. We typically use them for HTTP requests and when we want our `Components` to observe 
values set up inside a `Service`.  

You can think of observables like a newsletter:
- Only subscribers of the newsletter receive the newsletter
- If no-one subscribes to the newsletter, it probably will not be printed


### Promises vs. Observables

Promises...
1. Provide a single future value
2. Are not lazy
3. Can not cancel

Observables...
1. Emit multiple values over time
2. Are lazy (they won't do anything until somebody subscribes to them)
3. Are able to be canceled
4. Can be used with map, filter, reduce and other operators

We can also use RxJS (Reactive Extensions JavaScript) with Observables!  
https://rxjs.dev/


# Section 6: Routing in Angular

## Routing in Angular: Learning Goals

Implement routing in our Angular app and have an understanding of:
1. Angular routing (Single Page Application)
2. Adding a bootstrap theme
3. Using Angular route guards (they don't provide good security, but prevent
   users from navigating to areas they're not supposed to).
4. Using a Shared Module

```html
<a class="nav-link" routerLink="/members" routerLinkActive="active">Matches</a>
<a class="nav-link" routerLink="/lists" routerLinkActive="active">Lists</a>
<a class="nav-link" routerLink="/messages" routerLinkActive="active">Messages</a>
```

https://angular.io/guide/routing-overview  


## Installing Ngx Toastr

https://github.com/scttcper/ngx-toastr  

https://ngx-toastr.vercel.app/  

```
cd client/
npm install --cache /tmp/empty-cache
npm install
npm install ngx-toastr@14.3.0 --save
```

https://bootswatch.com/  

```
npm install bootswatch
```


# Section 7: Error Handling

## Error Handling: Learning Goals

Implement global error handling in both the API and the Angular application.
Also to have an understanding of:
1. API Middleware
2. Angular Interceptors
3. Troubleshooting Exceptions - "Error Handling Utopia"


# Section 8: Extending the API

## Extending the API: Learning Goals

Implement further functionality into our API and gain an understanding of:
1. Entity Framework Relationships
2. Entity Framework Conventions
3. Seeding Data into the Database
4. The Repository Pattern
5. Using AutoMapper


## The Repository Pattern

> A Repository mediates between the domain and data mapping layers, acting
> like an in-memory domain object collection.
> - Martin Fowler (Patterns of Enterprise Architecture)

We've got a web server, the Kestrel server, in our API 
https://learn.microsoft.com/en-us/aspnet/core/fundamentals/servers/kestrel?view=aspnetcore-7.0 
and requests come in to our controller endpoint. In our controllers we inject
the DB context, and our DB context represents a session with our database.

In our case, the repository is an abstraction from `DbContext`. The pattern
will encapsulate the logic (ex: `GetUser(), GetUsers(), UpdateUser()`), instead
of exposing the hundreds of methods native to `DbContext`. It also reduces
duplicate query logic, across multiple controllers. The repository pattern
also promotes testability - the repository is easier to test against than it
is to test the `DbContext` (ex: `IRepository, MockRepository`). The pattern
also decouples our application from the persistence framework (which in a way,
Entity Framework already accomplishes that to some extent).


# Section 9: Building the User Interface

## Building the User Interface: Learning Goals

Implement the components that make up the user interface in our client 
application and gain an understanding of:
1. Using Typescript types
2. Using the async pipe
3. Using bootstrap for styling
4. Basic CSS tricks to enhance the look
5. Using a 3rd party photo gallery


## Installing Ngx Gallery

https://github.com/kolkov/ngx-gallery

```
cd client/
npm install @kolkov/ngx-gallery --legacy-peer-deps
npm audit fix
```


# Section 10: Updating Resources

## Updating Resources: Learning Goals

Implement persistence when updating resources in the API and gaining an
understanding of:
1. Angular Template forms
2. The `CanDeactivate` Route Guard
3. The `@ViewChild` decorator
4. Persisting changes to the API
5. Adding loading indicators to the client app
6. Caching data in Angular services


# Section 11: Adding Photo Upload Functionality

## Adding Photo Upload Functionality: Learning Goals

Implement photo upload functionality in the application and gain an
understanding of the following:
1. Photo storage options
2. Adding related entities
3. Using a 3rd party API
4. Using the Debugger (again!)
5. Updating and deleting resources
6. What to return when creating resources in a REST based API

Photo Storage with Cloudinary:  
https://cloudinary.com/

## Image Upload Arch Flow

1. Client uploads photo to API with JTW token
2. Server uploads the photo to Cloudinary
3. Cloudinary stores photo and sends response
4. API saves photo URL and public ID to DB
5. Saved in DB and given auto-generated ID
6. 201 Created Response sent to client with location header

### NuGet: Installing CloudinaryDotNet

Open the **Command Palette** (SHIFT + CMD + P), and search for "NuGet" and click on the
option that reads "NuGet: Open NuGet Gallery".

Look for "cloudinary", and install "CloudinaryDotNet" by Cloudinary.
I selected version `1.20.0`.

Additionally, I added `API/appsettings.json` to the project `.gitignore` file.
This is where we will store the Cloudinary secret API Keys.
This is the original contents of the file for reference:
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```

## Installing Ng2 File Upload

https://github.com/valor-software/ng2-file-upload  

```
cd client/
npm install ng2-file-upload@2.0.0-3 --legacy-peer-deps
```

NOTE: Using `npm install ng2-file-upload@next --legacy-peer-deps` will result
in these compiler errors:
```
Error: node_modules/ng2-file-upload/file-upload/file-drop.directive.d.ts:19:18 - error TS2707: Generic type 'DirectiveDeclaration' requires between 6 and 8 type arguments.

19     static ɵdir: i0.DirectiveDeclaration<FileDropDirective, "[ng2FileDrop]", never, { "uploader": "uploader"; }, { "fileOver": "fileOver"; "onFileDrop": "onFileDrop"; }, never, never, false, never>;
                    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


Error: node_modules/ng2-file-upload/file-upload/file-select.directive.d.ts:14:18 - error TS2707: Generic type 'DirectiveDeclaration' requires between 6 and 8 type arguments.

14     static ɵdir: i0.DirectiveDeclaration<FileSelectDirective, "[ng2FileSelect]", never, { "uploader": "uploader"; }, { "onFileSelected": "onFileSelected"; }, never, never, false, never>;
                    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


** Angular Live Development Server is listening on localhost:4200, open your browser on https://localhost:4200/ **


✖ Failed to compile.
```
