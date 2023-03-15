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


## A Walking Skeleton
If you're running into issues, make sure you aren't using a repo that was originally 
configured for SSH, and you are now attempting to use the same repo with Git Credential 
Manager - this will be significantly more complex to configure.

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
Code notification prompting you to "Restart OmniSharp", go ahead and accept that to
restart the Extension.

You can "Toggle Terminal" with CTRL + Backtick (aka, Grave Accent; the key to the 
left of the "1" on your keyboard numbers row).

Back in the Extensions area, search for "C# Extensions", and install the Extension 
maintained by JosKreativ. And, install "Material Icon Theme" by Philipp Kief (after) 
this is installed, you need to click on "Material Icon Theme" in the Command Palette 
area (it should automagically show up).

Optionally: Under Preferences > Settings, search for "compact", and turn off
"Explorer: Compact Folders".
