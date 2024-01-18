To deploy the App's front end I have used a separate repository since it needs to be public in order to deploy it to the web. If the a new app needs to be deployed please follow these steps:

## 1. Clone Repo

## 2. Add a "remote" to the local Git repository.

You can do that by issuing a command in this format:

> $ git remote add origin https://github.com/{username}/{repo-name}.git

To customize that command for your situation, replace {username} with your GitHub username and replace {repo-name} with the name of the GitHub repository you created in Step 1.

That command tells Git where I want it to push things whenever I—or the gh-pages npm package acting on my behalf—issue the $ git push command from within this local Git repository.

## 3. Push the React app to the GitHub repository

> $ npm run deploy

That will cause the predeploy and deploy scripts defined in package.json to run.

Under the hood, the predeploy script will build a distributable version of the React app and store it in a folder named build. Then, the deploy script will push the contents of that folder to a new commit on the gh-pages branch of the GitHub repository, creating that branch if it doesn't already exist.

By default, the new commit on the gh-pages branch will have a commit message of "Updates". You can specify a custom commit message via the -m option, like this:

> $ npm run deploy -- -m "Deploy React app to GitHub Pages"

## 4. Configure GitHub Pages

  Navigate to the GitHub Pages settings page
        In your web browser, navigate to the GitHub repository
        Above the code browser, click on the tab labeled "Settings"
        In the sidebar, in the "Code and automation" section, click on "Pages"
    Configure the "Build and deployment" settings like this:
        Source: Deploy from a branch
        Branch:
            Branch: gh-pages
          Folder: / (root)
  Click on the "Save" button

All the information in this guide comes from the Github guide [Deploying a React App* to GitHub Pages](https://github.com/gitname/react-gh-pages)




