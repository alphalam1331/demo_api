pipeline {
    agent {
        docker { 
            image 'node:20.11.1-alpine3.19' 
        }
    }
    stages {
        stage('setup') {
            steps {
                echo "Setting up ${env.BUILD_ID} on ${env.JENKINS_URL}"
            }
        }
        stage('install') {
            steps {
                echo "Installing dependencies"
            }
        }
        stage('build') {
            steps {
                echo "Building"
            }
        }
        stage('test') {
            steps {
                echo "Testing"
            }
        }
        stage('deploy') {
            steps {
                echo "Deploying"
            }
        }

    }
}