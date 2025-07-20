import React, { useState, useEffect } from 'react';
import { useTranslation } from '../config/i18n';

interface TutorialProps {
  isOpen: boolean;
  onClose: () => void;
}

const Tutorial: React.FC<TutorialProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
    }
  }, [isOpen]);

  const updateProgress = () => {
    const progress = (currentStep / totalSteps) * 100;
    return progress;
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const sendDemoMessage = (demoId: string) => {
    const input = document.getElementById(`demoInput${demoId}`) as HTMLInputElement;
    const messages = document.getElementById(`demoMessages${demoId}`);
    
    if (input && messages && input.value.trim()) {
      // ユーザーメッセージを追加
      const userMessage = document.createElement('div');
      userMessage.className = 'message user';
      userMessage.innerHTML = `<div class="message-bubble">${input.value}</div>`;
      messages.appendChild(userMessage);
      
      // AIの返答を追加
      setTimeout(() => {
        const aiMessage = document.createElement('div');
        aiMessage.className = 'message ai';
        aiMessage.innerHTML = `<div class="message-bubble">興味深いアイデアですね！もう少し詳しく教えてください。どのような課題を解決したいのでしょうか？</div>`;
        messages.appendChild(aiMessage);
        messages.scrollTop = messages.scrollHeight;
      }, 1000);
      
      input.value = '';
      messages.scrollTop = messages.scrollHeight;
    }
  };

  const addDemoExample = (demoId: string) => {
    const input = document.getElementById(`demoInput${demoId}`) as HTMLInputElement;
    if (input) {
      input.value = '環境に優しいデリバリーサービスを考えています';
      sendDemoMessage(demoId);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-blue-500 text-white p-6 text-center">
          <h1 className="text-2xl font-semibold">AIチャット使い方ガイド</h1>
          <p className="mt-2 opacity-90">アイデア創出から検証まで、AIと一緒に進めましょう</p>
          <div className="bg-white bg-opacity-20 h-1 mt-4 rounded-full overflow-hidden">
            <div 
              className="bg-white h-full rounded-full transition-all duration-300"
              style={{ width: `${updateProgress()}%` }}
            ></div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Step 1 */}
          {currentStep === 1 && (
            <div className="animate-fadeIn">
              <div className="inline-block bg-blue-500 text-white w-8 h-8 rounded-full text-center leading-8 font-bold mb-4">1</div>
              <h2 className="text-xl font-semibold mb-3">AIチャットとは？</h2>
              <p className="text-gray-600 mb-6">
                このアプリは、あなたのアイデアを育てるAIパートナーです。<br />
                漠然とした着想を、具体的で実現可能なプランに変えていきます。
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                  <span className="text-xl mr-3 mt-1">💭</span>
                  <div>
                    <h4 className="font-semibold">アイデア壁打ち</h4>
                    <p className="text-sm text-gray-600">AIとの対話でアイデアを整理・発展させます</p>
                  </div>
                </div>
                <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                  <span className="text-xl mr-3 mt-1">🔍</span>
                  <div>
                    <h4 className="font-semibold">リアルタイム調査</h4>
                    <p className="text-sm text-gray-600">市場情報や競合分析を自動で調べます</p>
                  </div>
                </div>
                <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                  <span className="text-xl mr-3 mt-1">📝</span>
                  <div>
                    <h4 className="font-semibold">履歴管理</h4>
                    <p className="text-sm text-gray-600">対話内容を保存し、いつでも続きから開始</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-blue-800 font-semibold mb-2">💡 こんな場面で活用</h4>
                <p className="text-blue-700 text-sm">新規事業の企画、研究テーマの検討、マーケティング施策の立案、コンテンツのアイデア出しなど</p>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {currentStep === 2 && (
            <div className="animate-fadeIn">
              <div className="inline-block bg-blue-500 text-white w-8 h-8 rounded-full text-center leading-8 font-bold mb-4">2</div>
              <h2 className="text-xl font-semibold mb-3">基本的な使い方</h2>
              <p className="text-gray-600 mb-6">
                まずは気軽にアイデアを入力してみましょう。完璧である必要はありません。
              </p>

              <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-5 mb-4">
                <div className="bg-white border border-gray-300 rounded-lg h-80 flex flex-col">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-300 font-medium text-sm text-gray-700">
                    💬 AIチャット
                  </div>
                  <div className="flex-1 p-4 overflow-y-auto" id="demoMessages1">
                    <div className="flex mb-3">
                      <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-2xl max-w-[75%] text-sm">
                        こんにちは！どのようなアイデアについて話し合いましょうか？
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-300 p-3 flex gap-2">
                    <input 
                      type="text" 
                      className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm outline-none"
                      placeholder="アイデアを入力してください..."
                      id="demoInput1"
                      onKeyPress={(e) => e.key === 'Enter' && sendDemoMessage('1')}
                    />
                    <button 
                      className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm"
                      onClick={() => sendDemoMessage('1')}
                    >
                      送信
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded px-3 py-2 text-sm italic">
                  入力例：「環境に優しいデリバリーサービスを考えています」
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded px-3 py-2 text-sm italic">
                  入力例：「オンライン学習の新しいアプローチについて相談したいです」
                </div>
              </div>

              <button 
                className="w-full bg-green-500 text-white py-3 rounded-lg font-medium"
                onClick={() => addDemoExample('1')}
              >
                例を試してみる
              </button>
            </div>
          )}

          {/* Step 3 */}
          {currentStep === 3 && (
            <div className="animate-fadeIn">
              <div className="inline-block bg-blue-500 text-white w-8 h-8 rounded-full text-center leading-8 font-bold mb-4">3</div>
              <h2 className="text-xl font-semibold mb-3">AIとの対話で深掘り</h2>
              <p className="text-gray-600 mb-6">
                AIが様々な質問を投げかけます。答えることで、アイデアがより具体的になります。
              </p>

              <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-5 mb-4">
                <div className="bg-white border border-gray-300 rounded-lg h-80 flex flex-col">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-300 font-medium text-sm text-gray-700">
                    💬 AIチャット - 対話例
                  </div>
                  <div className="flex-1 p-4 overflow-y-auto">
                    <div className="flex justify-end mb-3">
                      <div className="bg-blue-500 text-white px-4 py-2 rounded-2xl max-w-[75%] text-sm">
                        環境に優しいデリバリーサービスを考えています
                      </div>
                    </div>
                    <div className="flex mb-3">
                      <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-2xl max-w-[75%] text-sm">
                        興味深いアイデアですね！具体的にはどのような点で環境に優しくしたいですか？配送方法、包装、エネルギー使用など、どこにフォーカスしますか？
                      </div>
                    </div>
                    <div className="flex justify-end mb-3">
                      <div className="bg-blue-500 text-white px-4 py-2 rounded-2xl max-w-[75%] text-sm">
                        電動バイクと再利用可能な容器を使いたいです
                      </div>
                    </div>
                    <div className="flex mb-3">
                      <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-2xl max-w-[75%] text-sm">
                        素晴らしいアプローチです！ターゲットはどのような顧客層でしょうか？また、容器の回収システムはどう考えていますか？
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-blue-800 font-semibold mb-2">💡 AIが聞く質問の例</h4>
                <p className="text-blue-700 text-sm">ターゲット顧客、収益モデル、競合との違い、実現可能性、必要なリソースなど、多角的な視点から質問します</p>
              </div>
            </div>
          )}

          {/* Step 4 */}
          {currentStep === 4 && (
            <div className="animate-fadeIn">
              <div className="inline-block bg-blue-500 text-white w-8 h-8 rounded-full text-center leading-8 font-bold mb-4">4</div>
              <h2 className="text-xl font-semibold mb-3">調査・検証機能</h2>
              <p className="text-gray-600 mb-6">
                「調べて」と言うだけで、AIが最新の市場情報や競合分析を行います。
              </p>

              <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-5 mb-6">
                <div className="bg-white border border-gray-300 rounded-lg h-80 flex flex-col">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-300 font-medium text-sm text-gray-700">
                    💬 調査機能のデモ
                  </div>
                  <div className="flex-1 p-4 overflow-y-auto">
                    <div className="flex justify-end mb-3">
                      <div className="bg-blue-500 text-white px-4 py-2 rounded-2xl max-w-[75%] text-sm">
                        電動バイクでのデリバリーサービスの競合を調べて
                      </div>
                    </div>
                    <div className="flex mb-3">
                      <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-2xl max-w-[75%] text-sm">
                        調査しました！主な競合は以下の通りです：<br /><br />
                        1. Uber Eats - 電動バイク導入を拡大中<br />
                        2. 出前館 - 環境配慮型配送を試験導入<br />
                        3. foodpanda - アジア各国で電動配送を展開<br /><br />
                        詳細な分析資料をお作りしますか？
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                  <span className="text-xl mr-3 mt-1">🌐</span>
                  <div>
                    <h4 className="font-semibold">リアルタイム検索</h4>
                    <p className="text-sm text-gray-600">最新のWeb情報を即座に検索・分析</p>
                  </div>
                </div>
                <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                  <span className="text-xl mr-3 mt-1">📊</span>
                  <div>
                    <h4 className="font-semibold">情報整理</h4>
                    <p className="text-sm text-gray-600">複数の情報源から要点を抽出し比較</p>
                  </div>
                </div>
                <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                  <span className="text-xl mr-3 mt-1">🔗</span>
                  <div>
                    <h4 className="font-semibold">出典明記</h4>
                    <p className="text-sm text-gray-600">すべての情報に信頼できる出典を記載</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5 */}
          {currentStep === 5 && (
            <div className="animate-fadeIn">
              <div className="inline-block bg-blue-500 text-white w-8 h-8 rounded-full text-center leading-8 font-bold mb-4">5</div>
              <h2 className="text-xl font-semibold mb-3">履歴管理と活用</h2>
              <p className="text-gray-600 mb-6">
                対話内容は自動保存され、後日続きから始めることができます。
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                  <span className="text-xl mr-3 mt-1">💾</span>
                  <div>
                    <h4 className="font-semibold">自動保存</h4>
                    <p className="text-sm text-gray-600">対話内容を安全に自動保存</p>
                  </div>
                </div>
                <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                  <span className="text-xl mr-3 mt-1">📁</span>
                  <div>
                    <h4 className="font-semibold">プロジェクト管理</h4>
                    <p className="text-sm text-gray-600">テーマ別に対話を整理・分類</p>
                  </div>
                </div>
                <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                  <span className="text-xl mr-3 mt-1">📤</span>
                  <div>
                    <h4 className="font-semibold">エクスポート</h4>
                    <p className="text-sm text-gray-600">対話内容をテキストやPDF形式でダウンロード</p>
                  </div>
                </div>
                <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                  <span className="text-xl mr-3 mt-1">🔍</span>
                  <div>
                    <h4 className="font-semibold">検索機能</h4>
                    <p className="text-sm text-gray-600">過去の対話を簡単に検索・参照</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-blue-800 font-semibold mb-2">💡 活用のコツ</h4>
                <p className="text-blue-700 text-sm">定期的に過去の対話を見返すことで、アイデアの発展過程を振り返り、新たな着想を得ることができます</p>
              </div>
            </div>
          )}

          {/* Step 6 */}
          {currentStep === 6 && (
            <div className="animate-fadeIn">
              <div className="inline-block bg-blue-500 text-white w-8 h-8 rounded-full text-center leading-8 font-bold mb-4">6</div>
              <h2 className="text-xl font-semibold mb-3">チュートリアル完了</h2>
              <p className="text-gray-600 mb-6">
                これでAIチャットの基本的な使い方を理解していただけました。<br />
                早速、あなたのアイデアをAIと一緒に育てていきましょう！
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h4 className="text-blue-800 font-semibold mb-2">🚀 始める前のヒント</h4>
                <p className="text-blue-700 text-sm">
                  ・完璧なアイデアである必要はありません<br />
                  ・「もっと詳しく」「別の視点で」など、AIに具体的な指示を出せます<br />
                  ・途中で保存して、時間を置いてから続けることも有効です
                </p>
              </div>

              <button 
                className="w-full bg-green-500 text-white py-3 rounded-lg font-medium"
                onClick={onClose}
              >
                AIチャットを開始する
              </button>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="border-t border-gray-200 bg-gray-50 p-4 flex justify-between items-center">
          <button 
            className={`px-4 py-2 rounded-lg font-medium ${
              currentStep === 1 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
            onClick={previousStep}
            disabled={currentStep === 1}
          >
            前へ
          </button>
          <span className="text-sm text-gray-600">{currentStep} / {totalSteps}</span>
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600"
            onClick={nextStep}
          >
            {currentStep === totalSteps ? '完了' : '次へ'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tutorial; 