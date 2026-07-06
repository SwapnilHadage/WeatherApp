import { AiOutlineRollback } from "../data/icons";
import { useSelector, useDispatch } from "react-redux";
import { changeLanguage, changeMode, changeTheme, } from '../redux/slices/setupSlice';
function Sidebar({onClose}) {
  const dispatch = useDispatch();

  const {language, mode, theme, }= useSelector(state=>state.setup);

  const modes = ['student', 'traveler', 'Professional',];
  const handleModeChange = (val)=>{
    dispatch(changeMode(val));
  }

  const languages = ['English', 'Hindi', 'Marathi',];
  const handleLanguageChange = (val)=>{
    dispatch(changeLanguage(val.trim()));
  }

  
  const handleThemeChange = (val)=>{
    dispatch(changeTheme());
  }

  return (
    <div className={` w-dvw h-dvh  bg-transparent absolute flex justify-end z-11`}
    >
      {/* Transparent div */}
      <div className={`flex-1 bg-black/50 relative `}
      aria-label='Close Sidebar'
      onClick={onClose}>
        <button
          aria-label='Close Sidebar'
          className={`absolute p-2 top-5 right-[-15px] rounded-2xl z-20 bg-white/90 hover:bg-white active:bg-white/80 p-3 transition-colors duration-200`}
          onClick={(e)=>{
            e.stopPropagation();
            onClose();
          }}>
            <AiOutlineRollback/>
        </button>
      </div>

      <div className={`bg-gray-500 w-[80%] h-dvh flex flex-col gap-5 font-sans text-chat-text relative text-chat-text overflow-y-auto overflow-x-auto scrollbar p-5`}
      >
        {/* theme */}
        <div className='w-fit shrink-0 border-2 border-gray-300 p-2'>
          Dark/Light
        </div>

        {/*modes*/}
        <div className=' w-fit shrink-0 border-2 border-gray-300 p-2 overflow-hidden'>
          <select name="modes" id="" className='border-none outline-none w-auto'
          onChange={(e)=>{
            handleModeChange(e.target.value)
          }}>
            {modes.map((mode,i) => {
              return(
                <option value={mode.toUpperCase()} key={i}>
                  {mode}
                </option>
              )
            })}
          </select>
        </div>

        {/*language*/}
        <div className='w-fit shrink-0 border-2 border-gray-300 p-2'>
          <select name="language" id="" className='outline-none'
          onChange={(e)=> {
            handleLanguageChange(e.target.value)
            }}>
            { languages.map((lang, i) => {
              return(
                <option value={lang} key={i}>
                  {lang}
                </option>
              )
            })}
          </select>
        </div>
      </div>
    </div>
  )
}

export default Sidebar