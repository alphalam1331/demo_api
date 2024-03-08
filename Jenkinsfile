pipeline {
  agent {
    docker {
      image 'node:20.11.1-alpine3.19'
    }

  }
  stages {
    stage('setup') {
      steps {
        git(url: 'https://github.com/alphalam1331/demo_api', poll: true, branch: 'main', credentialsId: '8bd35096-dcb1-40e7-8df6-1bd93c039b14', changelog: true)
      }
    }

    stage('install') {
      steps {
        echo 'Installing dependencies'
      }
    }

    stage('build') {
      steps {
        echo 'Building'
      }
    }

    stage('test') {
      steps {
        echo 'Testing'
      }
    }

    stage('deploy') {
      steps {
        echo 'Deploying'
      }
    }

  }
}