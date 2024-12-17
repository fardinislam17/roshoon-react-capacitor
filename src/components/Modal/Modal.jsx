import { createContext, useContext, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { IoClose } from 'react-icons/io5';

const ModalContext = createContext({});

const Modal = ({
  className,
  children,
  isShowing,
  setIsShowing,
  showBlur,
  customWidth,
  customHeight,
  backDrop = false,
  handleWith = 'setFunction',
  noPadding = false,
  dataTestId = 'modal',
}) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!backDrop) return;

    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        if (handleWith === 'setFunction') {
          setIsShowing(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [backDrop, setIsShowing, wrapperRef]);

  useEffect(() => {
    const html = document.querySelector('html');
    if (!html) return;

    if (!isShowing) {
      html.style.overflowY = 'visible';
      return;
    }

    html.style.overflowY = 'hidden';

    const focusableElements =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const modal = document.querySelector('#modal');
    const firstFocusableElement = modal.querySelectorAll(focusableElements)[0];
    const focusableContent = modal.querySelectorAll(focusableElements);
    const lastFocusableElement = focusableContent[focusableContent?.length - 1];

    document.addEventListener('keydown', function (e) {
      if (e.keyCode === 27) {
        if (handleWith === 'setFunction') {
          setIsShowing(false);
        }
      }

      const isTabPressed = e.key === 'Tab' || e.keyCode === 9;

      if (!isTabPressed) return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus();
          e.preventDefault();
        }
      }
    });

    firstFocusableElement?.focus();
  }, [isShowing, setIsShowing]);

  return (
    <>
      <ModalContext.Provider value={{ isShowing, setIsShowing, handleWith }}>
        {isShowing && typeof document !== 'undefined'
          ? ReactDOM.createPortal(
              <div
                className={`fixed top-0 left-0 z-50 flex h-screen xs:h-full xs:w-full w-screen items-center bg-[#33333347] justify-center ${
                  showBlur && 'backdrop-blur-md'
                }`}
                aria-labelledby="header-3a content-3a"
                aria-modal="true"
                tabIndex={-1}
                role="dialog"
                data-test-id={dataTestId}
              >
                <div className="fixed top-0 left-0 z-50 flex h-screen w-screen items-center justify-center bg-dark-900 opacity-40 " />
                <div
                  ref={wrapperRef}
                  className={`  ${
                    customWidth
                      ? customWidth
                      : 'md:w-7/12 lg:w-7/12 xl:w-8/12 w-11/12 max-w-xl'
                  } relative z-50 flex  ${customHeight ? customHeight : 'h-auto'} flex-col gap-6  bg-white ${
                    noPadding ? '' : 'p-8 '
                  } text-slate-500 shadow-xl shadow-slate-700/10 ${className}`}
                  id="modal"
                  role="document"
                >
                  {children}
                </div>
              </div>,
              document.body
            )
          : null}
      </ModalContext.Provider>
    </>
  );
};

const ModalHeader = ({
  children,
  noClose = false,
  className,
  closeBtnClick = () => {},
}) => {
  const { setIsShowing, handleWith } = useContext(ModalContext);
  return (
    <header
      id="header-3a"
      className={`flex justify-between items-center gap-4 ${className ? className : ''}`}
    >
      <div className="font-inter text-dark-800 text-lg capitalize font-bold">
        {children}
      </div>
      {!noClose ? (
        <button
          className="border-none outline-none text-xl text-black"
          onClick={() => {
            if (handleWith === 'setFunction') {
              setIsShowing(false);
            }

            closeBtnClick(true);
          }}
        >
          <IoClose />
        </button>
      ) : null}
    </header>
  );
};

const ModalBody = ({ children }) => <div>{children}</div>;
const ModalFooter = ({ children }) => <footer>{children}</footer>;

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
