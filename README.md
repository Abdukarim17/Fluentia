<h1>Fluentia</h1>
Fluentia is an OpenAI-powered mobile application designed to facilitate learning Arabic through interactive modules and real-time interactions with AI and users across the globe. By integrating modern technologies, Fluentia provides a personalized and immersive learning environment.


<div style="display: flex; justify-content: space-between;">
    <img src="/homepage.png" alt="Homepage" width="300" />
    <img src="/conversationpage.png" alt="Conversationpage" width="300" />
    <img src="/profilepage.png" alt="Profilepage" width="300" />
</div>



Features
AI-Powered Speech Recognition: Implemented Speech-to-Text (STT) and Text-to-Speech (TTS) features using OpenAI's API, enabling real-time assessment of pronunciation and grammar.
Interactive Learning: Personalized learning experience tailored to each user's progress and needs.
Real-Time Video Interaction: Integrated the Jitsi API to allow users to connect through live video calls, fostering community and enhancing learning.
Secure and Scalable Database: Utilized AWS-RDS with PostgreSQL for database management to ensure security and scalability.

Tech Stack
Frontend: React Native
Backend: FastAPI, Python
AI Integration: OpenAI API for STT, TTS, and learning modules
Real-Time Communication: Jitsi API for video calling
Database: AWS-RDS with PostgreSQL
Cloud: AWS for scalable infrastructure
Installation
Prerequisites
Python 3.x
Node.js
AWS account for RDS setup
OpenAI API Key
Jitsi API credentials
Backend Setup
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/fluentia.git
Navigate to the server directory:

bash
Copy code
cd fluentia/server
Install dependencies:

bash
Copy code
pip install -r requirements.txt
Set up your environment variables for OpenAI, Jitsi, and AWS:

bash
Copy code
export OPENAI_API_KEY=your_openai_api_key
export JITSI_API_KEY=your_jitsi_api_key
export DATABASE_URL=your_aws_rds_postgresql_url
Run the FastAPI server:

bash
Copy code
uvicorn app.main:app --reload
Frontend Setup
Navigate to the frontend directory:
bash
Copy code
cd fluentia/frontend
Install dependencies:
bash
Copy code
npm install
Run the React Native app:
bash
Copy code
npm start
Usage
Launch the mobile app.
Register or log in to create a profile.
Start learning with interactive modules and real-time AI feedback.
Connect with global users via video calls to practice your Arabic skills.
Contributions
Contributions are welcome! Please feel free to open an issue or submit a pull request for any improvements or features you would like to see.

License
This project is licensed under the MIT License.

