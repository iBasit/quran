let SessionLoad = 1
if &cp | set nocp | endif
let s:cpo_save=&cpo
set cpo&vim
map! <S-Insert> *
imap <silent> <Plug>IMAP_JumpBack =IMAP_Jumpfunc('b', 0)
imap <silent> <Plug>IMAP_JumpForward =IMAP_Jumpfunc('', 0)
vmap <NL> <Plug>IMAP_JumpForward
nmap <NL> <Plug>IMAP_JumpForward
vmap  :call Toggle()
nmap  :call Toggle()
map  a
nmap ,cj :em CVS.Join\ in\ 
nmap ,cp :em CVS.Import\ 
nmap ,ci :em CVS.Commit\ 
nmap ,ca :em CVS.Add\ 
nmap ,cv :em CVS.Revert\ changes\ 
nmap ,cu :em CVS.Update\ 
nmap ,cq :em CVS.Query\ update\ 
nmap ,co :em CVS.Checkout\ 
nmap ,cc :em CVS.Local\ status\ 
nmap ,ch :em CVS.Short\ status\ 
nmap ,cs :em CVS.Status\ 
nmap ,cl :em CVS.Log\ 
nmap ,cr :em CVS.History\ 
nmap ,cn :em CVS.Annotate\ 
nmap ,cd :em CVS.Diff\ 
nmap ,cwu :em CVS.Watch/Edit\ .Unedit\ 
nmap ,cwt :em CVS.Watch/Edit\ .Edit\ 
nmap ,cwe :em CVS.Watch/Edit\ .Editors\ 
nmap ,cwf :em CVS.Watch/Edit\ .Watch\ off\ 
nmap ,cwn :em CVS.Watch/Edit\ .Watch\ on\ 
nmap ,cwr :em CVS.Watch/Edit\ .Watch\ remove\ 
nmap ,cwa :em CVS.Watch/Edit\ .Watch\ add\ 
nmap ,cww :em CVS.Watch/Edit\ .Watchers\ 
nmap ,cth :em CVS.Tag\ .Create\ branch\ by\ module\ 
nmap ,cto :em CVS.Tag\ .Remove\ tag\ by\ module\ 
nmap ,cta :em CVS.Tag\ .Create\ tag\ by\ module\ 
nmap ,ctb :em CVS.Tag\ .Create\ branch\ 
nmap ,ctr :em CVS.Tag\ .Remove\ tag\ 
nmap ,ctc :em CVS.Tag\ .Create\ tag\ 
nmap ,cel :em CVS.Delete\ .Release\ workdir\ 
nmap ,cem :em CVS.Delete\ .Remove\ from\ repository\ 
nmap ,cmo :em CVS.Admin\ .Logout\ 
nmap ,cmi :em CVS.Admin\ .Login\ 
nmap ,cxw :em CVS.Extra\ .Get\ file\ (password)\ 
nmap ,cxg :em CVS.Extra\ .Get\ file\ 
nmap ,cxk :em CVS.Extra\ .CVS\ links\ 
nmap ,cxj :em CVS.Extra\ .Join\ in\ to\ revision\ 
nmap ,cxp :em CVS.Extra\ .Import\ to\ revision\ 
nmap ,cxi :em CVS.Extra\ .Commit\ to\ revision\ 
nmap ,cxf :em CVS.Extra\ .Merge\ in\ revision\ diffs\ 
nmap ,cxm :em CVS.Extra\ .Merge\ in\ revision\ 
nmap ,cxu :em CVS.Extra\ .Update\ to\ revision\ 
nmap ,cxo :em CVS.Extra\ .Checkout\ revision\ 
nmap ,cxl :em CVS.Extra\ .Log\ to\ revision\ 
nmap ,cxd :em CVS.Extra\ .Diff\ to\ revision\ 
nmap ,cxcu :em CVS.Extra\ .Create\ patchfile\ .Uni\ 
nmap ,cxcs :em CVS.Extra\ .Create\ patchfile\ .Standard\ 
nmap ,cxcc :em CVS.Extra\ .Create\ patchfile\ .Context\ 
nmap ,cym :em CVS.Directory\ .Remove\ from\ repositoy\ 
nmap ,cyi :em CVS.Directory\ .Commit\ 
nmap ,cya :em CVS.Directory\ .Add\ 
nmap ,cyu :em CVS.Directory\ .Update\ 
nmap ,cyq :em CVS.Directory\ .Query\ update\ 
nmap ,cyc :em CVS.Directory\ .Local\ status\ 
nmap ,cyh :em CVS.Directory\ .Short\ status\ 
nmap ,cys :em CVS.Directory\ .Status\ 
nmap ,cyl :em CVS.Directory\ .Log\ 
nmap ,ckt :em CVS.Keyword\ .State\ 
nmap ,cks :em CVS.Keyword\ .Source\ 
nmap ,ckr :em CVS.Keyword\ .Revision\ 
nmap ,ckf :em CVS.Keyword\ .RCSfile\ 
nmap ,ckl :em CVS.Keyword\ .Log\ 
nmap ,ckk :em CVS.Keyword\ .Locker\ 
nmap ,ckn :em CVS.Keyword\ .Name\ 
nmap ,cki :em CVS.Keyword\ .Id\ 
nmap ,ckh :em CVS.Keyword\ .Header\ 
nmap ,ckd :em CVS.Keyword\ .Date\ 
nmap ,cka :em CVS.Keyword\ .Author\ 
nmap ,cgip :em CVS.Settings\ .Install\ .Install\ buffer\ as\ plugin\ 
nmap ,cgih :em CVS.Settings\ .Install\ .Install\ buffer\ as\ help\ 
nmap ,cgid :em CVS.Settings\ .Install\ .Download\ updates\ 
nmap ,cgii :em CVS.Settings\ .Install\ .Install\ updates\ 
nmap ,cgou :em CVS.Settings\ .Output\ .Unsorted\ 
nmap ,cgos :em CVS.Settings\ .Output\ .Sorted\ 
nmap ,cgof :em CVS.Settings\ .Output\ .Full\ 
nmap ,cgoc :em CVS.Settings\ .Output\ .Compressed\ 
nmap ,cgoa :em CVS.Settings\ .Output\ .Autoswitch\ 
nmap ,cgon :em CVS.Settings\ .Output\ .Notify\ only\ 
nmap ,cgob :em CVS.Settings\ .Output\ .To\ new\ buffer\ 
nmap ,cgoob :em CVS.Settings\ .Output\ .Notifcation.Disable\ titlebar\ 
nmap ,cgoot :em CVS.Settings\ .Output\ .Notifcation.Enable\ titlebar\ 
nmap ,cgool :em CVS.Settings\ .Output\ .Notifcation.Disable\ statusline\ 
nmap ,cgoos :em CVS.Settings\ .Output\ .Notifcation.Enable\ statusline\ 
nmap ,cgqh :em CVS.Settings\ .Revision\ queries\ .Hide\ current\ rev\ 
nmap ,cgqo :em CVS.Settings\ .Revision\ queries\ .Offer\ current\ rev\ 
nmap ,cgqd :em CVS.Settings\ .Revision\ queries\ .Disable\ 
nmap ,cgqe :em CVS.Settings\ .Revision\ queries\ .Enable\ 
nmap ,cgds :em CVS.Settings\ .Diff\ .Restore\ pre-diff\ mode\ 
nmap ,cgdn :em CVS.Settings\ .Diff\ .No\ autorestore\ 
nmap ,cgda :em CVS.Settings\ .Diff\ .Autorestore\ prev\.mode\ 
nmap ,cgdd :em CVS.Settings\ .Diff\ .Switch\ to\ diffed\ 
nmap ,cgdo :em CVS.Settings\ .Diff\ .Stay\ in\ original\ 
nmap ,cgtd :em CVS.Settings\ .Target\ .Directory\ 
nmap ,cgtb :em CVS.Settings\ .Target\ .File\ in\ buffer\ 
nmap ,cgad :em CVS.Settings\ .Autocheck\ .Disable\ 
nmap ,cgae :em CVS.Settings\ .Autocheck\ .Enable\ 
nmap ,cgm :em CVS.Settings\ .Show\ mappings\ 
nmap ,cgf :em CVS.Settings\ .Info\ (buffer)\ 
nmap ,cf :em CVS.Info\ 
noremap / :call SearchCompleteStart()/
map Q gq
nmap <silent> \aocom :AlignPush:AlignCtrl g /[*/]\acom:AlignPop
nmap <silent> \t@ :AlignCtrl mIp1P1=l @:'a,.Align
nmap \sv <Plug>SVNVimDiff
nmap \su <Plug>SVNUpdate
nmap \si <Plug>SVNInfo
nmap \ss <Plug>SVNStatus
nmap \sr <Plug>SVNReview
nmap \sq <Plug>SVNRevert
nmap \sl <Plug>SVNLog
nmap \sg <Plug>SVNGotoOriginal
nmap \sd <Plug>SVNDiff
nmap \sc <Plug>SVNCommit
nmap \sG <Plug>SVNClearAndGotoOriginal
nmap \sn <Plug>SVNAnnotate
nmap \sa <Plug>SVNAdd
map <silent> \mm :ShowMarksPlaceMark
map <silent> \ma :ShowMarksClearAll
map <silent> \mh :ShowMarksClearMark
map <silent> \mo :ShowMarksOn
map <silent> \mt :ShowMarksToggle
nmap <silent> \ups :call Perl_RemoveGuiMenus()
nmap <silent> \lps :call Perl_CreateGuiMenus()
map \mbt <Plug>TMiniBufExplorer
map \mbu <Plug>UMiniBufExplorer
map \mbc <Plug>CMiniBufExplorer
map \mbe <Plug>MiniBufExplorer
nmap \cwr <Plug>CVSWatchRemove
nmap \cwf <Plug>CVSWatchOff
nmap \cwn <Plug>CVSWatchOn
nmap \cwa <Plug>CVSWatchAdd
nmap \cwv <Plug>CVSWatchers
nmap \cv <Plug>CVSVimDiff
nmap \cu <Plug>CVSUpdate
nmap \ct <Plug>CVSUnedit
nmap \cs <Plug>CVSStatus
nmap \cr <Plug>CVSReview
nmap \cq <Plug>CVSRevert
nmap \cl <Plug>CVSLog
nmap \cg <Plug>CVSGotoOriginal
nmap \ci <Plug>CVSEditors
nmap \ce <Plug>CVSEdit
nmap \cd <Plug>CVSDiff
nmap \cc <Plug>CVSCommit
nmap \cG <Plug>CVSClearAndGotoOriginal
nmap \cn <Plug>CVSAnnotate
nmap \ca <Plug>CVSAdd
map \rwp <Plug>RestoreWinPosn
map \swp <Plug>SaveWinPosn
nmap \ihn :IHN
nmap \is :IHS:A
nmap \ih :IHS
vmap <silent> \x <Plug>VisualTraditional
vmap <silent> \c <Plug>VisualTraditionalj
nmap <silent> \x <Plug>Traditional
nmap <silent> \c <Plug>Traditionalj
vmap <silent> \Htd :<BS><BS><BS>ma'>\Htd
vmap <silent> \tt :<BS><BS><BS>ma'>\tt
vmap <silent> \tp@ :<BS><BS><BS>ma'>\tp@
vmap <silent> \tsq :<BS><BS><BS>ma'>\tsq
vmap <silent> \tsp :<BS><BS><BS>ma'>\tsp
vmap <silent> \tml :<BS><BS><BS>ma'>\tml
vmap <silent> \tab :<BS><BS><BS>ma'>\tab
vmap <silent> \t@ :<BS><BS><BS>ma'>\t@
vmap <silent> \t? :<BS><BS><BS>ma'>\t?
vmap <silent> \t= :<BS><BS><BS>ma'>\t=
vmap <silent> \t< :<BS><BS><BS>ma'>\t<
vmap <silent> \t; :<BS><BS><BS>ma'>\t;
vmap <silent> \t: :<BS><BS><BS>ma'>\t:
vmap <silent> \ts, :<BS><BS><BS>ma'>\ts,
vmap <silent> \t, :<BS><BS><BS>ma'>\t,
vmap <silent> \t| :<BS><BS><BS>ma'>\t|
vmap <silent> \anum :<BS><BS><BS>ma'>\anum
vmap <silent> \afnc :<BS><BS><BS>ma'>\afnc
vmap <silent> \adef :<BS><BS><BS>ma'>\adef
vmap <silent> \adec :<BS><BS><BS>ma'>\adec
vmap <silent> \ascom :<BS><BS><BS>ma'>\ascom
vmap <silent> \aocom :<BS><BS><BS>ma'>\aocom
vmap <silent> \acom :<BS><BS><BS>ma'>\acom
vmap <silent> \abox :<BS><BS><BS>ma'>\abox
vmap <silent> \a= :<BS><BS><BS>ma'>\a=
vmap <silent> \a< :<BS><BS><BS>ma'>\a<
vmap <silent> \a, :<BS><BS><BS>ma'>\a,
vmap <silent> \a? :<BS><BS><BS>ma'>\a?
vmap <silent> \Tsp :<BS><BS><BS>ma'>\Tsp
vmap <silent> \T@ :<BS><BS><BS>ma'>\T@
vmap <silent> \T= :<BS><BS><BS>ma'>\T=
vmap <silent> \T< :<BS><BS><BS>ma'>\T<
vmap <silent> \T: :<BS><BS><BS>ma'>\T:
vmap <silent> \Ts, :<BS><BS><BS>ma'>\Ts,
vmap <silent> \T, :<BS><BS><BS>ma'>\T,
vmap <silent> \T| :<BS><BS><BS>ma'>\T|
map <silent> \tdW@ :AlignCtrl v ^\s*/[/*]:AlignCtrl mWp1P1=l @:'a,.Align
map <silent> \tW@ :AlignCtrl mWp1P1=l @:'a,.Align
omap <silent> \t@ :AlignCtrl mIp1P1=l @:'a,.Align
omap <silent> \aocom :AlignPush:AlignCtrl g /[*/]\acom:AlignPop
nmap gx <Plug>NetrwBrowseX
nnoremap <silent> <Plug>NetrwBrowseX :call netrw#NetrwBrowseX(expand("<cWORD>"),0)
nnoremap <silent> <Plug>SVNCommitDiff :SVNCommitDiff
nnoremap <silent> <Plug>SVNVimDiff :SVNVimDiff
nnoremap <silent> <Plug>SVNUpdate :SVNUpdate
nnoremap <silent> <Plug>SVNUnedit :SVNUnedit
nnoremap <silent> <Plug>SVNInfo :SVNInfo
nnoremap <silent> <Plug>SVNStatus :SVNStatus
nnoremap <silent> <Plug>SVNReview :SVNReview
nnoremap <silent> <Plug>SVNRevert :SVNRevert
nnoremap <silent> <Plug>SVNLog :SVNLog
nnoremap <silent> <Plug>SVNClearAndGotoOriginal :SVNGotoOriginal!
nnoremap <silent> <Plug>SVNGotoOriginal :SVNGotoOriginal
nnoremap <silent> <Plug>SVNDiff :SVNDiff
nnoremap <silent> <Plug>SVNCommit :SVNCommit
nnoremap <silent> <Plug>SVNAnnotate :SVNAnnotate
nnoremap <silent> <Plug>SVNAdd :SVNAdd
vmap <silent> <Plug>IMAP_JumpBack `<i=IMAP_Jumpfunc('b', 0)
vmap <silent> <Plug>IMAP_JumpForward i=IMAP_Jumpfunc('', 0)
vmap <silent> <Plug>IMAP_DeleteAndJumpBack "_<Del>i=IMAP_Jumpfunc('b', 0)
vmap <silent> <Plug>IMAP_DeleteAndJumpForward "_<Del>i=IMAP_Jumpfunc('', 0)
nmap <silent> <Plug>IMAP_JumpBack i=IMAP_Jumpfunc('b', 0)
nmap <silent> <Plug>IMAP_JumpForward i=IMAP_Jumpfunc('', 0)
nnoremap <silent> <Plug>CVSWatchRemove :CVSWatchRemove
nnoremap <silent> <Plug>CVSWatchOff :CVSWatchOff
nnoremap <silent> <Plug>CVSWatchOn :CVSWatchOn
nnoremap <silent> <Plug>CVSWatchAdd :CVSWatchAdd
nnoremap <silent> <Plug>CVSWatchers :CVSWatchers
nnoremap <silent> <Plug>CVSVimDiff :CVSVimDiff
nnoremap <silent> <Plug>CVSUpdate :CVSUpdate
nnoremap <silent> <Plug>CVSUnedit :CVSUnedit
nnoremap <silent> <Plug>CVSStatus :CVSStatus
nnoremap <silent> <Plug>CVSReview :CVSReview
nnoremap <silent> <Plug>CVSRevert :CVSRevert
nnoremap <silent> <Plug>CVSLog :CVSLog
nnoremap <silent> <Plug>CVSClearAndGotoOriginal :CVSGotoOriginal!
nnoremap <silent> <Plug>CVSGotoOriginal :CVSGotoOriginal
nnoremap <silent> <Plug>CVSEditors :CVSEditors
nnoremap <silent> <Plug>CVSEdit :CVSEdit
nnoremap <silent> <Plug>CVSDiff :CVSDiff
nnoremap <silent> <Plug>CVSCommit :CVSCommit
nnoremap <silent> <Plug>CVSAnnotate :CVSAnnotate
nnoremap <silent> <Plug>CVSAdd :CVSAdd
nmap <silent> <Plug>RestoreWinPosn :call RestoreWinPosn()
nmap <silent> <Plug>SaveWinPosn :call SaveWinPosn()
noremap <Plug>VisualFirstLine :call EnhancedCommentify('', 'first',   line("'<"), line("'>"))
noremap <Plug>VisualTraditional :call EnhancedCommentify('', 'guess',   line("'<"), line("'>"))
noremap <Plug>VisualDeComment :call EnhancedCommentify('', 'decomment',   line("'<"), line("'>"))
noremap <Plug>VisualComment :call EnhancedCommentify('', 'comment',   line("'<"), line("'>"))
noremap <Plug>FirstLine :call EnhancedCommentify('', 'first')
noremap <Plug>Traditional :call EnhancedCommentify('', 'guess')
noremap <Plug>DeComment :call EnhancedCommentify('', 'decomment')
noremap <Plug>Comment :call EnhancedCommentify('', 'comment')
nmap <SNR>33_WE <Plug>AlignMapsWrapperEnd
nmap <SNR>33_WS <Plug>AlignMapsWrapperStart
imap <NL> <Plug>IMAP_JumpForward
imap  :call Toggle()
inoremap  =GetCloseTag()
imap \ihn :IHN
imap \is :IHS:A
imap \ih :IHS
imap <silent> \x <Plug>Traditional
imap <silent> \c <Plug>Traditionalji
let &cpo=s:cpo_save
unlet s:cpo_save
set autoindent
set background=dark
set backspace=2
set noequalalways
set expandtab
set fileencodings=ucs-bom,utf-8,default
set guifont=lime
set guioptions=aegimLtTl
set helplang=en
set history=50
set hlsearch
set isfname=@,48-57,/,.,-,_,+,,,#,$,%,~,=,:
set nomodeline
set mouse=a
set mousemodel=popup
set ruler
set shiftwidth=4
set smarttab
set suffixes=.bak,~,.o,.h,.info,.swp,.obj,.info,.aux,.log,.dvi,.bbl,.out,.o,.lo
set tabstop=4
set termencoding=utf-8
set viminfo=!,'20,\"500
set window=59
set winminwidth=20
set winwidth=25
let s:so_save = &so | let s:siso_save = &siso | set so=0 siso=0
let v:this_session=expand("<sfile>:p")
silent only
cd /var/www/quran/player
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
badd +78 index.htm
badd +1 res/ui/js/player.js
badd +1 res/ui/js/quran.js
badd +1 res/ui/js/controller.js
badd +1 res/config/js/quran.js
badd +1 res/data/js/quran.js
badd +1 res/ui/css/themes/testing/all.css
badd +1 res/ui/css/themes/testing/icons.css
badd +1 res/ui/css/themes/testing/player.css
badd +1 res/ui/css/themes/testing/screen.css
badd +1 res/ui/css/themes/testing/testing.css
badd +1 res/ui/css/themes/testing/widgets.css
badd +1 res/ui/css/themes/testing/widgets/accordions.css
badd +1 res/ui/css/themes/testing/widgets/dialogs.css
badd +1 res/ui/css/themes/testing/widgets/resizables.css
badd +1 res/ui/css/themes/testing/widgets/sliders.css
badd +1 res/ui/css/themes/testing/widgets/sortables.css
badd +1 res/ui/css/themes/testing/widgets/tabs.css
args index.htm res/ui/js/player.js res/ui/js/quran.js res/ui/js/controller.js res/config/js/quran.js res/data/js/quran.js res/ui/css/themes/testing/all.css res/ui/css/themes/testing/icons.css res/ui/css/themes/testing/player.css res/ui/css/themes/testing/screen.css res/ui/css/themes/testing/testing.css res/ui/css/themes/testing/widgets.css res/ui/css/themes/testing/widgets/accordions.css res/ui/css/themes/testing/widgets/dialogs.css res/ui/css/themes/testing/widgets/resizables.css res/ui/css/themes/testing/widgets/sliders.css res/ui/css/themes/testing/widgets/sortables.css res/ui/css/themes/testing/widgets/tabs.css
edit index.htm
set splitbelow splitright
wincmd _ | wincmd |
vsplit
wincmd _ | wincmd |
vsplit
2wincmd h
wincmd w
wincmd w
set nosplitbelow
set nosplitright
wincmd t
set winheight=1 winwidth=1
exe 'vert 1resize ' . ((&columns * 25 + 90) / 180)
exe 'vert 2resize ' . ((&columns * 95 + 90) / 180)
exe 'vert 3resize ' . ((&columns * 58 + 90) / 180)
argglobal
enew
file -MiniBufExplorer-
let s:cpo_save=&cpo
set cpo&vim
nnoremap <buffer> 	 :call search('\[[0-9]*:[^\]]*\]'):<BS>
nnoremap <buffer> j gj
nnoremap <buffer> k gk
nnoremap <buffer> p :wincmd p:<BS>
nnoremap <buffer> <Down> gj
nnoremap <buffer> <Up> gk
nnoremap <buffer> <S-Tab> :call search('\[[0-9]*:[^\]]*\]','b'):<BS>
let &cpo=s:cpo_save
unlet s:cpo_save
setlocal keymap=
setlocal noarabic
setlocal autoindent
setlocal balloonexpr=
setlocal nobinary
setlocal bufhidden=delete
setlocal nobuflisted
setlocal buftype=nofile
setlocal nocindent
setlocal cinkeys=0{,0},0),:,0#,!^F,o,O,e
setlocal cinoptions=
setlocal cinwords=if,else,while,do,for,switch
setlocal comments=s1:/*,mb:*,ex:*/,://,b:#,:%,:XCOMM,n:>,fb:-
setlocal commentstring=/*%s*/
setlocal complete=.,w,b,u,t,i
setlocal completefunc=
setlocal nocopyindent
set cursorcolumn
setlocal cursorcolumn
set cursorline
setlocal cursorline
setlocal define=
setlocal dictionary=
setlocal nodiff
setlocal equalprg=
setlocal errorformat=
setlocal expandtab
if &filetype != ''
setlocal filetype=
endif
setlocal foldcolumn=0
setlocal foldenable
setlocal foldexpr=0
setlocal foldignore=#
setlocal foldlevel=0
setlocal foldmarker={{{,}}}
setlocal foldmethod=manual
setlocal foldminlines=1
setlocal foldnestmax=20
setlocal foldtext=foldtext()
setlocal formatexpr=
setlocal formatoptions=tcq
setlocal formatlistpat=^\\s*\\d\\+[\\]:.)}\\t\ ]\\s*
setlocal grepprg=
setlocal iminsert=2
setlocal imsearch=2
setlocal include=
setlocal includeexpr=
setlocal indentexpr=
setlocal indentkeys=0{,0},:,0#,!^F,o,O,e
setlocal noinfercase
setlocal iskeyword=@,48-57,_,192-255
setlocal keywordprg=
setlocal nolinebreak
setlocal nolisp
setlocal nolist
setlocal makeprg=
setlocal matchpairs=(:),{:},[:]
setlocal nomodeline
setlocal nomodifiable
setlocal nrformats=octal,hex
set number
setlocal nonumber
set numberwidth=3
setlocal numberwidth=3
setlocal omnifunc=
setlocal path=
setlocal nopreserveindent
setlocal nopreviewwindow
setlocal quoteescape=\\
setlocal noreadonly
setlocal norightleft
setlocal rightleftcmd=search
setlocal noscrollbind
setlocal shiftwidth=4
setlocal noshortname
setlocal nosmartindent
setlocal softtabstop=0
setlocal nospell
setlocal spellcapcheck=[.?!]\\_[\\])'\"\	\ ]\\+
setlocal spellfile=
setlocal spelllang=en
setlocal statusline=
setlocal suffixesadd=
setlocal noswapfile
setlocal synmaxcol=3000
if &syntax != ''
setlocal syntax=
endif
setlocal tabstop=4
setlocal tags=
setlocal textwidth=0
setlocal thesaurus=
setlocal nowinfixheight
setlocal nowinfixwidth
set nowrap
setlocal nowrap
setlocal wrapmargin=0
wincmd w
argglobal
setlocal keymap=
setlocal noarabic
setlocal autoindent
setlocal balloonexpr=
setlocal nobinary
setlocal bufhidden=
setlocal buflisted
setlocal buftype=
setlocal nocindent
setlocal cinkeys=0{,0},0),:,0#,!^F,o,O,e
setlocal cinoptions=
setlocal cinwords=if,else,while,do,for,switch
setlocal comments=s:<!--,m:\ \ \ \ ,e:-->
setlocal commentstring=<!--%s-->
setlocal complete=.,w,b,u,t,i
setlocal completefunc=
setlocal nocopyindent
set cursorcolumn
setlocal cursorcolumn
set cursorline
setlocal cursorline
setlocal define=
setlocal dictionary=
setlocal nodiff
setlocal equalprg=
setlocal errorformat=
setlocal expandtab
if &filetype != 'xhtml'
setlocal filetype=xhtml
endif
setlocal foldcolumn=0
setlocal foldenable
setlocal foldexpr=0
setlocal foldignore=#
setlocal foldlevel=0
setlocal foldmarker={{{,}}}
setlocal foldmethod=manual
setlocal foldminlines=1
setlocal foldnestmax=20
setlocal foldtext=foldtext()
setlocal formatexpr=
setlocal formatoptions=croql
setlocal formatlistpat=^\\s*\\d\\+[\\]:.)}\\t\ ]\\s*
setlocal grepprg=
setlocal iminsert=2
setlocal imsearch=2
setlocal include=
setlocal includeexpr=
setlocal indentexpr=
setlocal indentkeys=0{,0},:,0#,!^F,o,O,e
setlocal noinfercase
setlocal iskeyword=@,48-57,_,192-255
setlocal keywordprg=
setlocal nolinebreak
setlocal nolisp
setlocal nolist
setlocal makeprg=
setlocal matchpairs=(:),{:},[:],<:>
setlocal nomodeline
setlocal modifiable
setlocal nrformats=octal,hex
set number
setlocal number
set numberwidth=3
setlocal numberwidth=3
setlocal omnifunc=htmlcomplete#CompleteTags
setlocal path=
setlocal nopreserveindent
setlocal nopreviewwindow
setlocal quoteescape=\\
setlocal noreadonly
setlocal norightleft
setlocal rightleftcmd=search
setlocal noscrollbind
setlocal shiftwidth=4
setlocal noshortname
setlocal nosmartindent
setlocal softtabstop=0
setlocal nospell
setlocal spellcapcheck=[.?!]\\_[\\])'\"\	\ ]\\+
setlocal spellfile=
setlocal spelllang=en
setlocal statusline=
setlocal suffixesadd=
setlocal swapfile
setlocal synmaxcol=3000
if &syntax != 'xhtml'
setlocal syntax=xhtml
endif
setlocal tabstop=4
setlocal tags=
setlocal textwidth=0
setlocal thesaurus=
setlocal nowinfixheight
setlocal nowinfixwidth
set nowrap
setlocal nowrap
setlocal wrapmargin=0
silent! normal! zE
let s:l = 56 - ((55 * winheight(0) + 29) / 58)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
56
normal! 012l
wincmd w
argglobal
edit res/ui/js/player.js
setlocal keymap=
setlocal noarabic
setlocal autoindent
setlocal balloonexpr=
setlocal nobinary
setlocal bufhidden=
setlocal buflisted
setlocal buftype=
setlocal nocindent
setlocal cinkeys=0{,0},0),:,0#,!^F,o,O,e
setlocal cinoptions=
setlocal cinwords=if,else,while,do,for,switch
setlocal comments=sO:*\ -,mO:*\ \ ,exO:*/,s1:/*,mb:*,ex:*/,://
setlocal commentstring=//%s
setlocal complete=.,w,b,u,t,i
setlocal completefunc=
setlocal nocopyindent
set cursorcolumn
setlocal cursorcolumn
set cursorline
setlocal cursorline
setlocal define=
setlocal dictionary=
setlocal nodiff
setlocal equalprg=
setlocal errorformat=
setlocal expandtab
if &filetype != 'javascript'
setlocal filetype=javascript
endif
setlocal foldcolumn=0
setlocal foldenable
setlocal foldexpr=0
setlocal foldignore=#
setlocal foldlevel=0
setlocal foldmarker={{{,}}}
setlocal foldmethod=manual
setlocal foldminlines=1
setlocal foldnestmax=20
setlocal foldtext=foldtext()
setlocal formatexpr=
setlocal formatoptions=croql
setlocal formatlistpat=^\\s*\\d\\+[\\]:.)}\\t\ ]\\s*
setlocal grepprg=
setlocal iminsert=2
setlocal imsearch=2
setlocal include=
setlocal includeexpr=
setlocal indentexpr=
setlocal indentkeys=0{,0},:,0#,!^F,o,O,e
setlocal noinfercase
setlocal iskeyword=@,48-57,_,192-255
setlocal keywordprg=
setlocal nolinebreak
setlocal nolisp
setlocal nolist
setlocal makeprg=
setlocal matchpairs=(:),{:},[:]
setlocal nomodeline
setlocal modifiable
setlocal nrformats=octal,hex
set number
setlocal number
set numberwidth=3
setlocal numberwidth=3
setlocal omnifunc=javascriptcomplete#CompleteJS
setlocal path=
setlocal nopreserveindent
setlocal nopreviewwindow
setlocal quoteescape=\\
setlocal noreadonly
setlocal norightleft
setlocal rightleftcmd=search
setlocal noscrollbind
setlocal shiftwidth=4
setlocal noshortname
setlocal nosmartindent
setlocal softtabstop=0
setlocal nospell
setlocal spellcapcheck=[.?!]\\_[\\])'\"\	\ ]\\+
setlocal spellfile=
setlocal spelllang=en
setlocal statusline=
setlocal suffixesadd=
setlocal swapfile
setlocal synmaxcol=3000
if &syntax != 'javascript'
setlocal syntax=javascript
endif
setlocal tabstop=4
setlocal tags=
setlocal textwidth=0
setlocal thesaurus=
setlocal nowinfixheight
setlocal nowinfixwidth
set nowrap
setlocal nowrap
setlocal wrapmargin=0
silent! normal! zE
let s:l = 18 - ((16 * winheight(0) + 29) / 58)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
18
normal! 0
wincmd w
2wincmd w
exe 'vert 1resize ' . ((&columns * 25 + 90) / 180)
exe 'vert 2resize ' . ((&columns * 95 + 90) / 180)
exe 'vert 3resize ' . ((&columns * 58 + 90) / 180)
tabnext 1
if exists('s:wipebuf')
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=25 shortmess=filnxtToO
let s:sx = expand("<sfile>:p:r")."x.vim"
if file_readable(s:sx)
  exe "source " . s:sx
endif
let &so = s:so_save | let &siso = s:siso_save
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
