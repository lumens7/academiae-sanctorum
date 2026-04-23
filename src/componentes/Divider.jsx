export default function Divider() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="flex items-center gap-4 w-full max-w-[50rem]">
        <div className="h-[2px] bg-gradient-to-r from-transparent via-[#1C2A3A] to-[#B89B5E] flex-1"></div>
        <div className="relative">
          <div className="absolute inset-0 bg-[#1C2A3A]/20 rounded-full blur-md"></div>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative">
            <path d="M12 2L12 22M2 12L22 12" stroke="#1C2A3A" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="12" cy="12" r="2" fill="#B89B5E"/>
          </svg>
        </div>
        <div className="h-[2px] bg-gradient-to-r from-[#B89B5E] via-[#1C2A3A] to-transparent flex-1"></div>
      </div>
    </div>
  );
}