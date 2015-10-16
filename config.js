System.config({
  baseURL: ".",
  defaultJSExtensions: true,
  transpiler: "typescript",
  typescriptOptions: {
    "noImplicitAny": false,
    "typeCheck": true
  },
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },

  packages: {
    "src": {
      "main": "app",
      "defaultExtension": "ts",
      "meta": {
        "*.ts": {
          "loader": "typescript"
        },
        "*.css": {
          "loader": "css"
        }
      }
    }
  },

  map: {
    "angular": "github:angular/bower-angular@1.4.7",
    "angular-material": "github:angular/bower-material@0.11.2",
    "angular-route": "github:angular/bower-angular-route@1.4.7",
    "core-js": "npm:core-js@0.9.18",
    "css": "github:systemjs/plugin-css@0.1.18",
    "text": "github:systemjs/plugin-text@0.0.2",
    "ts": "github:frankwallis/plugin-typescript@2.0.17",
    "typescript": "npm:typescript@1.6.2",
    "github:angular/bower-angular-animate@1.4.7": {
      "angular": "github:angular/bower-angular@1.4.7"
    },
    "github:angular/bower-angular-aria@1.4.7": {
      "angular": "github:angular/bower-angular@1.4.7"
    },
    "github:angular/bower-angular-route@1.4.7": {
      "angular": "github:angular/bower-angular@1.4.7"
    },
    "github:angular/bower-material@0.11.2": {
      "angular": "github:angular/bower-angular@1.4.7",
      "angular-animate": "github:angular/bower-angular-animate@1.4.7",
      "angular-aria": "github:angular/bower-angular-aria@1.4.7",
      "css": "github:systemjs/plugin-css@0.1.18"
    },
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "npm:core-js@0.9.18": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    }
  }
});
