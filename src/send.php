<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
header('Content-type: application/json');
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin, access-control-allow-methods, access-control-allow-headers');

echo json_encode($request);

$to = 'stac.pradeep@gmail.com';
$subject = 'Identity Cards - Query';
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= 'From:Identity Cards <'.$request->mail.'>' . "\r\n";
$message = '<table>';
$message .= '<tr>';
$message .= '<td>Name:</td>'.'<td>'.$request->name.'</td>';
$message .= '</tr>';
$message .= '<tr>';
$message .= '<td>Email ID:</td>'.'<td>'.$request->mail.'</td>';
$message .= '</tr>';
$message .= '<tr>';
$message .= '<td>Phone No:</td>'.'<td>'.$request->phone.'</td>';
$message .= '</tr>';
$message .= '<tr>';
$message .= '<td>Message:</td>'.'<td>'.$request->msg.'</td>';
$message .= '</tr>';

if(mail($to, $subject, $message, $headers)){
echo "Your Query Successfully Sent, we will get back to you seen.";
}?>