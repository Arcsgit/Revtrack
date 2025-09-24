// Script to insert sample data into your backend
import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:5000';

async function insertSampleData() {
  try {
    console.log('🚀 Starting to insert sample data...');
    
    // Test if server is running
    console.log('📡 Testing server connection...');
    const testResponse = await fetch(`${BASE_URL}/test`);
    const testData = await testResponse.text();
    console.log('✅ Server response:', testData);
    
    // Insert sample data
    console.log('📝 Inserting sample data...');
    const insertResponse = await fetch(`${BASE_URL}/insert-sample-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    const insertData = await insertResponse.json();
    console.log('✅ Sample data inserted:', insertData);
    
    // Get all tasks to verify
    console.log('📋 Fetching all tasks...');
    const tasksResponse = await fetch(`${BASE_URL}/task`);
    const tasks = await tasksResponse.json();
    console.log('📊 All tasks:', JSON.stringify(tasks, null, 2));
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n💡 Make sure:');
    console.log('1. Your server is running (npm run dev)');
    console.log('2. Your .env file has correct Supabase credentials');
    console.log('3. You have a "tasks" table in your Supabase database');
  }
}

// Run the script
insertSampleData();
