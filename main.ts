import { Construct } from 'constructs';
import { App, TerraformStack } from 'cdktf';
import { Container, Image } from './.gen/providers/docker'

class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    // define resources here
    const dockerImage = new Image(this, 'nginxImage', {
      name: 'nginx:latest',
      keepLocally: false,
    })

    new Container(this, 'nginxContainer', {
      image: dockerImage.latest,
      name: 'tutorial',
      ports: [
        {
          internal: 80,
          external: 8080,
        },
      ],
    })
  }
}

const app = new App();
new MyStack(app, 'typescript-docker-terrraform');
app.synth();
