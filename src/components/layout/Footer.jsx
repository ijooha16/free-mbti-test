const Footer = () => {
  return (
    <footer className="mt-[60px] w-full h-[400px] flex flex-col justify-center items-center bg-lightgray">
      <div className="flex gap-[12px] mb-[40px]">
        <a href="https://github.com/ijooha16">
          <img
            src="https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/71-github-512.png"
            alt="github"
            className="w-[60px] h-[60px]"
          />
        </a>
        <a href="https://ijooha.tistory.com/">
          <img
            src="https://www.basicincomeparty.kr/wp-content/uploads/2020/11/tistory-logo-fill.png"
            alt="tistory"
            className="w-[60px] h-[60px]"
          />
        </a>
      </div>

      <p className="text-subgray text-center mb-[40px]">
        MBTI TEST는 여러분의 성격 유형을 빠르고 정확하게 분석해드립니다.
        <br />
        다양한 질문을 통해 여러분의 성향을 파악하고, 이에 맞는 MBTI 결과를
        제공합니다.
      </p>

      {/* 저작권 */}
      <p className="text-xs text-[#bcbcc4]">
        © 2025 MBTI TEST. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
