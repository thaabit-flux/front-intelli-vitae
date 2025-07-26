import { MongoClient } from 'mongodb';

export async function POST(request) {
  // Validate request has file
  if (!request.headers.get('content-type')?.includes('multipart/form-data')) {
    return Response.json(
      { success: false, message: 'Invalid content type' },
      { status: 415 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get('resume');
    
    if (!file) {
      return Response.json(
        { success: false, message: 'No file provided' },
        { status: 400 }
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      return Response.json(
        { success: false, message: 'File size exceeds 5MB limit' },
        { status: 413 }
      );
    }

    const buffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(buffer);

    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();
    
    const result = await db.collection('resumes').insertOne({
      filename: file.name,
      contentType: file.type,
      size: file.size,
      uploadDate: new Date(),
      data: fileBuffer,
      lastModified: file.lastModified
    });

    await client.close();
    
    return Response.json({
      success: true,
      fileId: result.insertedId
    });
    
  } catch (error) {
    console.error('Upload error:', error);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}