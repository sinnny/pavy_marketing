import { useCallback, useRef, useState, type ComponentPropsWithoutRef, type ReactElement } from 'react';
import { Check, Copy } from 'lucide-react';
import { clsx } from 'clsx';
import { useTranslation } from '@pavy/i18n';

type CodeProps = ComponentPropsWithoutRef<'code'> & { className?: string };

function extractLanguage(child: ReactElement<CodeProps> | null): string | null {
  const cls = child?.props?.className ?? '';
  const match = /language-([^\s]+)/.exec(cls);
  return match ? match[1] : null;
}

function extractText(node: unknown): string {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (typeof node === 'object' && 'props' in (node as Record<string, unknown>)) {
    const el = node as { props?: { children?: unknown } };
    return extractText(el.props?.children);
  }
  return '';
}

export function CodeBlock(props: ComponentPropsWithoutRef<'pre'>) {
  const { children, className, ...rest } = props;
  const { t } = useTranslation('site');
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const codeChild = (Array.isArray(children) ? children[0] : children) as ReactElement<CodeProps> | null;
  const language = extractLanguage(codeChild);

  const handleCopy = useCallback(async () => {
    const text = preRef.current?.innerText ?? extractText(children);
    try {
      await navigator.clipboard.writeText(text.replace(/\n$/, ''));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard blocked (insecure context or permissions) — fail silently.
    }
  }, [children]);

  return (
    <div className="group relative my-6">
      {language && (
        <span className="absolute left-4 top-3 text-[10px] uppercase tracking-widest text-slate-400/70 select-none pointer-events-none">
          {language}
        </span>
      )}
      <button
        type="button"
        onClick={handleCopy}
        className={clsx(
          'absolute top-2 right-2 inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium',
          'bg-slate-800/80 text-slate-200 border border-slate-700',
          'opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity',
          'hover:bg-slate-700 hover:text-white'
        )}
      >
        {copied ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
        <span>{copied ? t('pages.docs.codeBlock.copied') : t('pages.docs.codeBlock.copy')}</span>
      </button>
      <pre
        ref={preRef}
        className={clsx(className, language && 'pt-8')}
        {...rest}
      >
        {children}
      </pre>
    </div>
  );
}
