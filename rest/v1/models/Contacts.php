<?php

Class Contacts {
    // 8rows
    public $contacts_aid;
    public $contacts_web;
    public $contacts_userhandle;
    public $contacts_username;
    public $contacts_is_active;
    public $contacts_published_date;
    public $contacts_created;
    public $contacts_datetime;
    
    public $contacts_search;
    public $connection;
    public $lastInsertedId;
    public $tblcontacts;

    public function __construct($db) {
        $this->connection = $db;
        $this->tblcontacts = "tbl_contacts";
    }

    public function create() {
        try {
             $sql = "insert into {$this->tblcontacts} ";
             $sql .= "( contacts_web, ";
             $sql .= "contacts_userhandle, ";
             $sql .= "contacts_username, ";
             $sql .= "contacts_is_active, ";
             $sql .= "contacts_published_date, ";
             $sql .= "contacts_created, ";
             $sql .= "contacts_datetime ) values ( ";
             $sql .= ":contacts_web, ";
             $sql .= ":contacts_userhandle, ";
             $sql .= ":contacts_username, ";
             $sql .= ":contacts_is_active, ";
             $sql .= ":contacts_published_date, ";
             $sql .= ":contacts_created, ";
             $sql .= ":contacts_datetime ) ";
             $query = $this->connection->prepare($sql);
             $query->execute([
                "contacts_web" => $this->contacts_web,
                "contacts_userhandle" => $this->contacts_userhandle,
                "contacts_username" => $this->contacts_username,
                "contacts_is_active" => $this->contacts_is_active,
                "contacts_published_date" => $this->contacts_published_date,
            
                "contacts_created" => $this->contacts_created,
                "contacts_datetime" => $this->contacts_datetime,
             ]);
        $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $ex) {
            $query = false;
        }
        
        return $query;
    }
    
    public function readAll()
    {
        try {
            $sql = "select * ";
            $sql .= "from {$this->tblcontacts} ";
            $sql .= "order by contacts_is_active desc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
    public function delete()
    {
        try {
            $sql = "delete from {$this->tblcontacts} ";
            $sql .= "where contacts_aid = :contacts_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "contacts_aid" => $this->contacts_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
    public function update()
    {
        try {
            $sql = "update {$this->tblcontacts} set ";
            $sql .= "contacts_web = :contacts_web, ";
            $sql .= "contacts_userhandle = :contacts_userhandle, ";
            $sql .= "contacts_username = :contacts_username, ";     
            $sql .= "contacts_published_date = :contacts_published_date, ";
            $sql .= "contacts_datetime = :contacts_datetime ";
            $sql .= "where contacts_aid = :contacts_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "contacts_web" => $this->contacts_web,
                "contacts_userhandle" => $this->contacts_userhandle,
                "contacts_username" => $this->contacts_username,
                "contacts_published_date" => $this->contacts_published_date,
                "contacts_datetime" => $this->contacts_datetime,
                "contacts_aid" => $this->contacts_aid,
         
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
    public function active()
    {
        try {
            $sql = "update {$this->tblcontacts} set ";
            $sql .= "contacts_is_active = :contacts_is_active, ";
            $sql .= "contacts_datetime = :contacts_datetime ";
            $sql .= "where contacts_aid  = :contacts_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "contacts_is_active" => $this->contacts_is_active,
                "contacts_datetime" => $this->contacts_datetime,
                "contacts_aid" => $this->contacts_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
    public function search(){
        try {
            $sql = "select ";
            $sql .= "* ";
            $sql .= "from {$this->tblcontacts} ";
            $sql .= "where contacts_web like :contacts_web ";
            $sql .= "order by contacts_is_active desc, ";
            $sql .= "contacts_web asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "contacts_web" => "%{$this->contacts_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}