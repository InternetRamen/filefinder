const glob = require("glob");
const fs = require("fs");
const path = require("path");
const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});

readline.question("What's the output folder called?", (output) => {
    if (!fs.existsSync(output)) {
        console.log("Folder not found");
        setTimeout(function () {
            readline.close();
        }, 5000);
    } else {
        readline.question("What's the file called?", (fileToMatch) => {
            glob(`**/${fileToMatch}`, function (er, files) {
                if (files.length == 0) {
                    console.log("Cannot find file");
                    setTimeout(function () {
                        readline.close();
                    }, 5000);
                } else {
                    console.log("Copying...");
                    for (let file of files) {
                        let group = file.split("/");
                        console.log(file);
                        fs.copyFileSync(
                            path.resolve(__dirname, file),
                            path.resolve(
                                __dirname,
                                output,
                                group[group.length - 1]
                            )
                        );
                        console.log(
                            `Copied to ${output}/${group[group.length - 1]}`
                        );
                    }
                }
                setTimeout(function () {
                    readline.close();
                }, 5000);
            });
            
        });
    }
});
