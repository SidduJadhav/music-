'use client'

export default function Chatbot() {
  return (
    <div className="flex flex-col h-[calc(100vh-100px)]">
      <iframe
        src="https://cdn.botpress.cloud/webchat/v2.3/shareable.html?configUrl=https://files.bpcontent.cloud/2024/12/27/11/20241227113845-DCGAOCAK.json"
        title="Music Genre Chatbot"
        className="flex-grow"
        style={{ width: '100%', height: '100%', border: 'none' }}
      />
    </div>
  )
}
