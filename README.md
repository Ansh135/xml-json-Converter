# XML-JSON Converter

A robust Node.js application that converts XML files to JSON format with AWS S3 upload support. This tool provides a simple and efficient way to transform XML data into JSON format while maintaining data integrity.

## Features

- XML to JSON conversion
- AWS S3 integration for file storage
- File upload support
- Data validation using JSON Schema
- Compression support
- Secure file handling
- RESTful API endpoints

## Prerequisites

- Node.js (>= 18.0.0)
- npm (Node Package Manager)
- AWS Account with S3 access
- AWS credentials configured

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/xml-json-converter.git
cd xml-json-converter
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=your_region
AWS_BUCKET_NAME=your_bucket_name
```

## Usage

### Starting the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

### API Endpoints

- `POST /api/convert`: Convert XML to JSON
- `POST /api/upload`: Upload files to AWS S3
- `GET /api/files`: List uploaded files
- `GET /api/files/:id`: Get specific file details

## Project Structure

```
xml-json-converter/
├── config/         # Configuration files
├── controllers/    # Route controllers
├── middleware/     # Custom middleware
├── public/         # Static files
├── routes/         # API routes
├── services/       # Business logic
├── utils/          # Utility functions
├── uploads/        # Temporary file storage
├── app.js          # Application entry point
└── package.json    # Project dependencies
```

## Development

### Available Scripts

- `npm start`: Start the production server
- `npm run dev`: Start the development server with hot-reload
- `npm test`: Run tests
- `npm run lint`: Run ESLint

### Testing

The project uses Jest for testing. Run tests with:
```bash
npm test
```

## Dependencies

### Main Dependencies
- express: Web framework
- aws-sdk: AWS services integration
- xml2js: XML to JSON conversion
- multer: File upload handling
- dotenv: Environment configuration
- ajv: JSON Schema validation
- jszip: ZIP file handling
- compression: Response compression
- crypto-js: Cryptographic functions

### Development Dependencies
- eslint: Code linting
- jest: Testing framework
- nodemon: Development server
- supertest: API testing

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Support

For support, please open an issue in the GitHub repository or contact the maintainers. 
