<?php
    $mirrors = array( 
        'http://dev.globalquran.com/audio/www.everyayah.com/data/',
        'http://everyayah.com/data/'
    );
    function icmp_checksum($data) {
        if (strlen($data)%2)
            $data .= "\x00";

        $bit = unpack('n*', $data);
        $sum = array_sum($bit);

        while ($sum >> 16)
            $sum = ($sum >> 16) + ($sum & 0xffff);

        return pack('n*', ~$sum);
    }

    $type       = "\x08";
    $code       = "\x00";
    $checksum   = "\x00\x00";
    $identifier = "\x00\x00";
    $seq_number = "\x00\x00";
    $data       =  "Scarface";
    $package    = $type.$code.$checksum.$identifier.$seq_number.$data;
    $checksum   = icmp_checksum($package); 
    $package    = $type.$code.$checksum.$identifier.$seq_number.$data;


    $result = array();
    for ($i=0;$i<count($mirrors);$i++) {
        preg_match('@^(?:http://)?([^/]+)@i',$mirrors[$i],$match);
        $hostname = $match[1];
        $result[$i] = array();
        $socket = socket_create(AF_INET, SOCK_RAW, 1);
        socket_connect($socket, $hostname, null);
        $start_time = microtime(true);
        socket_send($socket, $package, strLen($package), 0);
        if (socket_read($socket, 255))
            $result[$i]['ping'] = round(microtime(true) - $start_time, 4);
        socket_close($socket);

        $result[$i]['status'] = (int)exec("curl -s -I ". $mirrors[$i] ."| head -n 1 | sed -e 's/^[^ ]* //g' -e 's/ .*$//g'");
        $result[$i]['url'] = $mirrors[$i];
    }

    $file = fopen('config.mirrors.js','w');
    fwrite($file, "quran.config.mirrors = ".json_encode($result));
    fclose($file);
?>
